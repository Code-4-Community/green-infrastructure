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

export enum ApplicationStatus {
  APPROVED = 'Approved',
  PENDING = 'Pending',
  REJECTED = 'Rejected',
}
