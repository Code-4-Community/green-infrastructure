/**
 * Represents the model schema of an application
 */

export type ApplicationsModel = {
  appId: number;
  userId: number;
  siteId: number;
  names: Array<string>;
  status: ApplicationStatus;
  dateApplied: Date;
  isFirstApplication: boolean;
};

export type ApplicationInputModel = {
  appId: {S: string},
  userId: {S: string},
  siteId: {S: string},
  names: {S: string},
  status: {S: string},
  dateApplied: {S: string},
  isFirstApplication: {S: string},
};


export enum ApplicationStatus {
  APPROVED = 'Approved',
  PENDING = 'Pending',
  REJECTED = 'Rejected',
}
