import { Injectable } from "@nestjs/common";
import { UserModel } from "./user.model";
import { DynamoDbService } from "../dynamodb";
import {UserStatus} from "./user.model";
import {Role} from "./user.model";

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
     * Maps a user's data from DynamoDB to a UserModel object.
     * @param objectId the user's id
     * @param data the user's data from DynamoDB
     * @throws Error if the user's status or role is invalid
     * @returns the user's information as a UserModel object
     */
    private mapDynamoDBItemToUserModel(objectId: number, data: {[key: string]: any}): UserModel {

        const siteIds = data["siteIds"]?.NS?.map(Number) ?? [];


        return {
            userID: objectId,
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



}