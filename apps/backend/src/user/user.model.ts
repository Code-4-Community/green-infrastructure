import { PhoneNumberDto } from "./phoneNumber.dto";
/**
 * Represents the model schema of a user.
 */
export type UserModel = {
    userID: number,
    firstName: string,
    lastName: string,
    phoneNumber: PhoneNumberDto,
    email: string,
    siteIDs: number[],
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