/**
 * Represents the model schema of a site
 */
export type SiteModel = {
    siteID: number,
    siteName: string,
    siteStatus: SiteStatus,
    assetType: string,
    symbolType: SymbolType,
    siteLatitude: number,
    siteLongitude: number,
    dateAdopted: Date,
    maintenanceReports: number[],
    neighborhood: string,
    address: string
};

export enum SiteStatus {
    ADOPTED = "Adopted",
    AVAILABLE = "Available",
};

export enum SymbolType {
    RAIN_GARDEN = "Rain Garden",
    BIOSWALE = "Bioswale",
    BIORETENTION = "Bioretention",
    TREE_TRENCH_PIT = "Tree Trench/Pit",
    GREEN_ROOF_PLANTER = "Green Roof/Planter"
};