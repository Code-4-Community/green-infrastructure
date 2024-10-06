import { Module } from "@nestjs/common";
import { SiteService } from "./site.service";
import { DynamoDbService } from "../dynamodb";
import { SiteController } from "./site.controller";

@Module({
    imports: [],
    providers: [SiteService, DynamoDbService],
    controllers: [SiteController],
    exports: [SiteService],
})

export class SiteModule{}