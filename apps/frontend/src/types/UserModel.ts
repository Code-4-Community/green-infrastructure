export type UserModel = {
  userId: number,
  firstName: string,
  lastName: string,
  phoneNumber: number,
  email: string,
  siteIds: number[],
  zipCode: number,
  birthDate: Date,
  role: Role,
  status: UserStatus
};


export enum Role {
  VOLUNTEER = "Volunteer",
  ADMIN = "Admin",
};

export enum UserStatus {
  APPROVED = "Approved",
  PENDING = "Pending",
  DENIED = "Denied",
};

export type NewUserInput = {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    zipCode: string,
    birthDate: string,
};