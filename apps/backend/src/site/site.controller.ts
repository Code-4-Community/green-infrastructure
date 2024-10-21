import {
    Controller,
    Get,
    Param,
    Query
} from "@nestjs/common";
import { SiteService } from "./site.service";
import { SiteModel } from "./site.model";

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
    public async getAllSitesByStatus(
        @Query("status") status: string
    ): Promise<SiteModel[]> {
        return this.siteService.getAllSitesByStatus(status);
    }


}