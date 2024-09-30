import { Module } from "@nestjs/common";
import { ApplicationsService } from "./applications.service";
import { ApplicationsController } from "./applications.controller";

@Module({
    imports: [],
    providers: [ApplicationsService],
    controllers: [ApplicationsController],
    exports: [ApplicationsService],
})

export class ApplicationsModule{}