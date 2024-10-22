import {
    Controller,
    Get,
    Param,
    Query,
    Delete
} from "@nestjs/common";
import { SiteService } from "./site.service";
import { SiteModel } from "./site.model";
import { ApiQuery } from "@nestjs/swagger";

@Controller("sites")
export class SiteController {
    constructor(private siteService: SiteService) {}

    @Get("/status/")
    @ApiQuery({ name: "status", required: true })
    public async getSitesByStatus(
        @Query('status') status: string        
    ): Promise<SiteModel[]> {
        console.log("status: ", status);
        return this.siteService.getSitesByStatus(status);
    }


    
    @Get("/symbolType/")
    @ApiQuery({ name: "symbolType", required: true })
    public async getSitesBySymbolType(
        @Query('symbolType') symbolType: string
    ): Promise<SiteModel[]> {
        return this.siteService.getSitesBySymbolType(symbolType);
    }


    @Get(":id")
    public async getSite(
        @Param("id") siteId: number
    ): Promise<SiteModel> {
        return this.siteService.getSite(siteId);
    }  

 





}