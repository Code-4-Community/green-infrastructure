import {
    Controller,
    Get,
    Param,
    Query
} from "@nestjs/common";
import { SiteService } from "./site.service";
import { SiteModel } from "./site.model";
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