import {
    Controller,
    UseGuards,
    Delete,
    Get,
    Post,
    Put,
    Body,
    Param,
    Query
} 
from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { SiteService } from "./site.service";
import { SiteModel } from "./site.model";
import { NewSiteInput } from "../dtos/newSiteDTO";
import { ApiQuery, ApiTags } from "@nestjs/swagger";

@ApiTags('Sites')
@Controller("sites")
export class SiteController {
    constructor(private siteService: SiteService) {}

    @Get()
    public async getAllSites(): Promise<SiteModel[]> {
        return this.siteService.getAllSites();
    }

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

    @UseGuards(AuthGuard('jwt'))
    @Post("/addSite")
    public async postSite(@Body() siteData: NewSiteInput) {
        return this.siteService.postSite(siteData);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete("/deleteSite/:id")
    public async deleteSiteById(
        @Param("id") siteId: number
    ): Promise<void> {
        return this.siteService.deleteSite(siteId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put("/adopt/:id")
    public async setSiteStatusAdopt(@Param("id") siteId: number): Promise<void> {
        return this.siteService.adoptSite(siteId);
    }
 

}