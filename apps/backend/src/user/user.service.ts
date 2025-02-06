import { Injectable } from "@nestjs/common";
import { UserModel, EditUserModel } from "./user.model";
import { DynamoDbService } from "../dynamodb";
import { UserInputModel, UserStatus, Role } from "./user.model";
import { NewUserInput } from "../dtos/newUserDTO";

@Injectable()
export class UserService {

    private readonly tableName = 'gibostonUsers';
    constructor(private readonly dynamoDbService: DynamoDbService) {}

    /**
     * Gets a user's information based on the user's id.
     * @param userId The user's id
     * @throws Error if the user's data could not be fetched from DynamoDB
     * @throws Error if the user's status or role is invalid
     * @returns The user's information as a UserModel object
     */
    public async getUser(userId: number): Promise<UserModel> {
        try {
            const key = { 'userId' : {N: userId.toString()}};
            const data = await this.dynamoDbService.getItem(this.tableName, key);
            if (!data) {
                throw new Error(`No user found with id: ${userId}`);
            }
            console.log(data);
            return(this.mapDynamoDBItemToUserModel(userId,data));

        }
        catch(e) {
            throw new Error(`Error fetching data for user with id: ${userId}: ${e.message}`);
        }

    }

    public async postUser(userData: NewUserInput, role: Role) {
        const newId = await this.dynamoDbService.getHighestUserId(this.tableName) + 1;
        const userModel = this.PostInputToUserVolunteerModel(userData, newId.toString(), role);
        console.log("Received user data:", userData);
        try {
            const result = await this.dynamoDbService.postItem(this.tableName, userModel);
            return {...result, newUserID: newId.toString()};
        } catch (e) {
            throw new Error("Unable to post new user: " + e);
        }
    }


    public async getUserTables(userId: number): Promise<Array<number>> {
        try {
            const key = { 'userId' : {N: userId.toString()}};
            const data = await this.dynamoDbService.getItem(this.tableName, key);
            if (!data) {
                throw new Error(`No user found with id: ${userId}`);
            }
            console.log(data);
            const siteIds = data["siteIds"].L.map(item => Number(item.N));
            return siteIds;
        } 
        catch(e) {
            throw new Error(`Error fetching data for user with id: ${userId}: ${e.message}`);
        }
    }


    public async editUser(userId: number, model :EditUserModel): Promise<any> {

        try {
            // A list of commands for each edit, only adds if exists
            const commands = [];
            const expressionAttributeValues :Record<string,any> = {};
            const expressionAttributeNames: Record<string, string> = {}; // Added for aliases

            const originalUser = await this.getUser(userId);



            if (model.firstName) {
                commands.push(`firstName = :firstName`);
                expressionAttributeValues[":firstName"] = { S: model.firstName };
            }
    
            if (model.lastName) {
                commands.push(`lastName = :lastName`);
                expressionAttributeValues[":lastName"] = { S: model.lastName };
            }
    
            if (model.phoneNumber) {
                commands.push(`phoneNumber = :phoneNumber`);
                expressionAttributeValues[":phoneNumber"] = { S: model.phoneNumber };
            }
    
            if (model.siteId) {
                // Ensure siteId is treated as a string
                const siteIdStr = model.siteId.toString();
          
                // Use list_append to add the new siteId to the siteIds list
                commands.push(`siteIds = list_append(siteIds, :siteId)`);
                expressionAttributeValues[":siteId"] = { L: [{ N: siteIdStr }] };
          
                // Check if siteId exists in greenInfraBostonSites using getItem
                const siteKey = { siteId: { S: siteIdStr } };
                const siteCheckResult = await this.dynamoDbService.getItem('greenInfraBostonSites', siteKey);

                if(originalUser.siteIds.includes(model.siteId)) {
                    return {statusCode: 400, message: "Site already exists in user's siteIds"};
                }
          
                if (!siteCheckResult) {
                    return {statusCode: 400, message: "Site does not exist"};
                }
              }

              if (model.status) {
                commands.push(`#s = :status`);
                expressionAttributeValues[":status"] = { S: model.status };
                expressionAttributeNames["#s"] = "status"; // Define the alias
              }


            // Make sure commands aren't empty
            if (commands.length === 0) {
                throw new Error("No fields to update");
            }


            // Combine into one update expression and update the user 
            const updateExpr = `SET ${commands.join(", ")}`;
            const key = { 'userId' : {N: userId.toString()}};
            const data = await this.dynamoDbService.updateItemWithExpression(this.tableName, key, updateExpr,expressionAttributeValues, expressionAttributeNames)
  
            const result = await this.getUser(userId);
            

            if (!data) {
                return {statusCode: 400, message: "No user found with id: " + userId};
            }
            return result;
        } catch(e) {
            throw new Error(`Error updating data for user with id: ${userId}: ${e.message}`);
        }            
    }
        

    // Run backend on postman please, not SwaggerUI
    public async getUserByStatus(status: UserStatus): Promise<UserModel[]> {
        try {
            const filterExpression = "#user_status = :statusOf";
            const expressionAttributeValues = { ":statusOf": { S: status } };
            const expressionAttributeNames = {"#user_status":"status"}
    
            const data = await this.dynamoDbService.scanTable(
                this.tableName,
                filterExpression,
                expressionAttributeValues,
                expressionAttributeNames
                
            );
    
            return data.map(item => this.mapDynamoDBItemToUserModelV2(item)); // added data
        } catch (error) {
            console.error("Error fetching users by status:", error);
            throw new Error(`Error fetching users by status: ${error.message}`);
        }
    }



    /**
     * Maps a user's data from DynamoDB to a UserModel object.
     * @param objectId the user's id
     * @param data the user's data from DynamoDB
     * @throws Error if the user's status or role is invalid
     * @returns the user's information as a UserModel object
     */
    private mapDynamoDBItemToUserModel(objectId: number, data?: {[key: string]: any}): UserModel {

        const siteIds = data["siteIds"].L.map(item => Number(item.N)) ?? [];


        return {
            userId: objectId,
            firstName: data['firstName'].S,
            lastName: data['lastName'].S,
            email: data['email'].S,
            phoneNumber: data['phoneNumber'].N,
            siteIds: siteIds,
            zipCode: data['zipCode'].S,
            birthDate: new Date(data['birthDate'].S),
            role: data['role'].S,
            status: data['status'].S
        };
    }

    private PostInputToUserVolunteerModel = (input: NewUserInput, userId: string, role: Role): UserInputModel => {
        return {
            userId: {N: userId},
            firstName: {S: input.firstName},
            lastName: {S: input.lastName},
            phoneNumber: {S: input.phoneNumber},
            email: {S: input.email},
            zipCode: {S: input.zipCode},
            birthDate: {S: input.birthDate},
            role: {S: role},
            siteIds: {S: "null"},
            status: {S: UserStatus.PENDING}
        };
    }
    /**
     * Maps a user's data from DynamoDB to a UserModel object.
     * @param data the user's data from DynamoDB
     * @returns the user's information as a UserModel object
     */
    private mapDynamoDBItemToUserModelV2(data: { [key: string]: any }): UserModel {
        return {
            userId: data["userId"].N,
            firstName: data["firstName"].S,
            lastName: data["lastName"].S,
            email: data["email"].S,
            phoneNumber: parseInt(data["phoneNumber"].N),
            siteIds: data["siteIds"]?.NS?.map(Number) ?? [],
            zipCode: parseInt(data["zipCode"].N),
            birthDate: new Date(data["birthDate"].S),
            role: data["role"].S,
            status: data["status"].S as UserStatus,
        };
    }




}