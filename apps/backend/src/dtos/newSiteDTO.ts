export type NewSiteInput = {
    // siteID: number /// will be auto generated
    siteName: string,
    // siteStatus: string, will always be "AVAILABLE"
    assetType: string,
    symbolType: string,
    siteLatitude: string,
    siteLongitude: string,
    // dateAdopted: Date, will be null
    neighborhood: string,
    address: string
};