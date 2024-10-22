import { Injectable } from "@nestjs/common";
import { SiteModel, SiteStatus } from "./site.model";
import { DynamoDbService } from "../dynamodb"; 

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

}