
/**
 * A DTO representing a user.
 */
export type UserModel = {
    userID: number,
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