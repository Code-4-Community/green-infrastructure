import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Query
} from "@nestjs/common";
import { SiteService } from "./site.service";
import { SiteModel } from "./site.model";
import { NewSiteInput } from "../dtos/newSiteDTO";
import { ApiQuery } from "@nestjs/swagger";

@Controller("sites")
export class SiteController {
    constructor(private siteService: SiteService) {}

    @Get(":id")
    public async getSite(
        @Param("id") siteId: number
    ): Promise<SiteModel> {
        return this.siteService.getSite(siteId);
    }  

    @Post()
    public async postSite(@Body() siteData: NewSiteInput) {
        return this.siteService.postSite(siteData);
    }

    @Get()
    @ApiQuery({ name: 'status', required: false }) // makes query parameter optional
    @ApiQuery({ name: 'symbol-type', required: false })
    public async getSites(
        @Query("status") status?: string,
        @Query("symbol-type") symbolType?: string
    ): Promise<SiteModel[]> {
        return this.siteService.getFilteredSites({ status, symbolType });
    }


}