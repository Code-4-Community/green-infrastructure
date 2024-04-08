import SymbolType from "./symbolType";

export default interface Site {
    siteId: number;
    address: string;
    assetName: string;
    assetType: string;
    latitude: string;
    longitude: string;
    linkToConstructionPlans: string;
    linkToFinalReports: string;
    linkToMaintenanceAgreement: string;
    linkToMaintenanceChecklist: string;
    linkToRFQ: string;
    maintenanceAgreement: boolean;
    neighborhood: string;
    partnerDepartments: string; 
    symbolType: SymbolType;
}