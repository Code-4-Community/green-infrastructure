import { Injectable } from "@nestjs/common";
import { ApplicationsModel } from "./applications.model";

@Injectable()
export class ApplicationsService {

    /**
     * Gets all applications.
     * 
     * @returns
     */

    public async getApplications(): Promise<[ApplicationsModel]> { 
        try{
            return await getApplicationsData() as Promise<[ApplicationsModel]>
        }
        catch(e) {
            throw new Error("Unable to retrieve applications.")
        }
    }
}