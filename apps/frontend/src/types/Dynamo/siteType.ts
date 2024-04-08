import SymbolType from "./assetType";

export default interface Site {
    siteId: number;
    address: string;
    assetName: string;
    assetType: string;
    latitude: number;
    linkToConstructionPlans: string;
    linkToFinalReports: string;
    linkToMaintenanceAgreement: string;
    linkToMaintenanceChecklist: string;
    linkToRFQ: string;
    longitude: number;
    maintenanceAgreement: boolean;
    neighborhood: string;
    partnerDepartments: string; 
    symbolType: SymbolType;
}