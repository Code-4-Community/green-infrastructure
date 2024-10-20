import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { DynamoDbService } from "../dynamodb";

@Module({
    imports: [],
    providers: [UserService,DynamoDbService],
    controllers: [UserController],
    exports: [UserService],
})

export class UserModule{}