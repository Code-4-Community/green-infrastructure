import { Injectable } from "@nestjs/common";
import { UserModel } from "./user.model";
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

    /**
     * Removes the user of the given user id.
     * @param userId The user's id
     * @throws Error if the user's data could not be fetched from DynamoDB
     * @returns The user's information as a UserModel object
     */
    public async remove(userId: number): Promise<void> {
        try {
            const key = { 'userId' : {N: userId.toString()}};
            await this.dynamoDbService.deleteItem(this.tableName, key);
            console.log(`Deleted user with id ${userId}`);
        }
        catch(e) {
            throw new Error(`Unable to delete user: ${userId}: ${e.message}`);
        }

    }
    public async postUserVolunteer(userData: NewUserInput) {
        const userModel = this.PostInputToUserVolunteerModel(userData);
        const newId = await this.dynamoDbService.getHighestUserId(this.tableName) + 1;
        userModel.userId.N = newId.toString();
        console.log("Using new ID:" + userModel.userId.N);
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


    /**
     * Maps a user's data from DynamoDB to a UserModel object.
     * @param objectId the user's id
     * @param data the user's data from DynamoDB
     * @throws Error if the user's status or role is invalid
     * @returns the user's information as a UserModel object
     */
    private mapDynamoDBItemToUserModel(objectId: number, data: {[key: string]: any}): UserModel {

        const siteIds = data["siteIds"]?.NS?.map(Number) ?? [];


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

    private PostInputToUserVolunteerModel = (input: NewUserInput): UserInputModel => {
        return {
            userId: {N: "0"},
            firstName: {S: input.firstName},
            lastName: {S: input.lastName},
            phoneNumber: {S: input.phoneNumber},
            email: {S: input.email},
            zipCode: {S: input.zipCode},
            birthDate: {S: input.birthDate},
            role: {S: Role.VOLUNTEER},
            siteIds: {S: "null"},
            status: {S: UserStatus.PENDING}
        };
    }

}