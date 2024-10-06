import {
    Controller,
    Get,
    Param,
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


}