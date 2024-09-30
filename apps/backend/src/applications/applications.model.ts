/**
 * Represents the model schema of an application
 */

export type ApplicationsModel = {
    appID: number,
    userID: number,
    siteID: number,
    names: Array<string>,
    status: ApplicationStatus,
    dateApplied: Date,
    isFirstApplication: boolean
}

export enum ApplicationStatus{
    APPROVED = "Approved",
    PENDING = "Pending",
    REJECTED = "Rejected"
}