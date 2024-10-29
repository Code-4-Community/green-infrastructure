import { Injectable } from "@nestjs/common";
import { SiteInputModel, SiteModel, SiteStatus, SymbolType } from "./site.model";
import { DynamoDbService } from "../dynamodb"; 
import { NewSiteInput } from "../dtos/newSiteDTO";

@Injectable()
export class SiteService {

    private readonly tableName = 'greenInfraBostonSites';

    constructor(private readonly dynamoDbService: DynamoDbService) {}

    /**
     * Gets a site information based on that site's id.
     * @param siteId
     * @returns
    */
    public async getSite(siteId: number): Promise<SiteModel> {
        try{
            const key = { 'siteId': { S: siteId.toString() } };
            const data = await this.dynamoDbService.getItem(this.tableName, key);
            return(this.mapDynamoDBItemToSite(siteId, data));
        }  
        catch(e) {
            throw new Error("Unable to get site data: "+ e)
        }
    }
  
    public async postSite(siteData: NewSiteInput) {
        const siteModel = this.PostInputToSiteModel(siteData);
        const newId = await this.dynamoDbService.getHighestSiteId(this.tableName) + 1;
        siteModel.siteId.S = newId.toString();
        console.log("Using new ID:" + siteModel.siteId.S)
        try {
            const result = await this.dynamoDbService.postItem(this.tableName, siteModel);
            return {...result, newSiteId: newId.toString()};
        } catch (e) {
            throw new Error("Unable to post new site: " + e);
        }
    }



    public async getSitesByStatus(status: string): Promise<SiteModel[]> {
        try {
            const data = await this.dynamoDbService.scanTable(this.tableName, "siteStatus = :status", { ":status": { S: status } }  );
            const sites: SiteModel[] = [];
            for (let i = 0; i < data.length; i++) {
                try {
                    sites.push(this.mapDynamoDBItemToSite(parseInt(data[i]["siteId"].S), data[i]));
                } catch (error) {
                    console.error('Error mapping site:', error, data[i]);
                }

            }
            console.log("Found " + sites.length + " \"" + status + "' sites");
            return sites;
        }
        catch(e) {
            throw new Error("Unable to get site by status: "+ e)
        }

    }

    public async getSitesBySymbolType(symbolType: string): Promise<SiteModel[]> {
        try {
            const data = await this.dynamoDbService.scanTable(this.tableName, "symbolType = :symbolType", { ":symbolType": { S: symbolType } }  );
            const sites: SiteModel[] = [];
            for (let i = 0; i < data.length; i++) {
                try {
                    sites.push(this.mapDynamoDBItemToSite(parseInt(data[i]["siteId"].S), data[i]));
                } catch (error) {
                    console.error('Error mapping site:', error, data[i]);
                }

            }
            console.log("Found " + sites.length + " \"" + symbolType + "' sites");
            return sites;
        }
        catch(e) {
            throw new Error("Unable to get site by symbol: "+ e)
        }

    }

    public async deleteSite(siteId: number): Promise<void> {
        try {
            const key = { 'siteId': { S: siteId.toString() } };
            await this.dynamoDbService.deleteItem(this.tableName, key);
            console.log(`Deleted site with id ${siteId}`);
        } catch (e) {
            throw new Error("Unable to delete site data: " + e);
        }
    }


    private mapDynamoDBItemToSite = (objectId: number, item: { [key: string]: any }): SiteModel => {
        return {
            siteID: objectId,
            siteName: item["siteName"].S,
            siteStatus: SiteStatus.AVAILABLE, //placeholder until table is updated
            assetType: item["assetType"].S,
            symbolType: item["symbolType"].S,
            siteLatitude: item["siteLatitude"].S,
            siteLongitude: item["siteLongitude"].S,
            dateAdopted: new Date(), //placeholder until table is updated
            maintenanceReports: [], //placeholder until table is updated
            neighborhood: item["neighborhood"].S,
            address: item["address"].S
        };
    };

    private PostInputToSiteModel = (input: NewSiteInput): SiteInputModel => {
        return {
            siteId: {S: ""},
            siteName: {S: input.siteName},
            siteStatus: {S: SiteStatus.AVAILABLE},
            assetType: {S: input.assetType},
            symbolType: {S: input.symbolType as SymbolType},
            siteLatitude: {S: input.siteLatitude},
            siteLongitude: {S: input.siteLongitude},
            neighborhood: {S: input.neighborhood},
            address: {S: input.address},
        };
    }

}