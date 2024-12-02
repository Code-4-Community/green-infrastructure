import { ApiProperty } from '@nestjs/swagger';

/**
 * A DTO representing a user.
 */
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

export type UserInputModel = {
    userId: {N: string},
    firstName: {S: string},
    lastName: {S: string},
    phoneNumber: {S: string},
    email: {S: string},
    zipCode: {S: string},
    birthDate: {S: string},
    role: {S: string},
    siteIds: {S: string},
    status: {S: string}
};
export class EditUserModel {
    @ApiProperty({ required: false, description: 'First name of the user' })
    firstName?: string;
    @ApiProperty({ required: false, description: 'Last name of the user' })
    lastName?: string;
    @ApiProperty({ required: false, description: 'Phone number of the user' })
    phoneNumber?: string;
    @ApiProperty({ required: false, description: 'Site ID to append to siteIds' })
    siteId?: number;
    @ApiProperty({ required: false, description: 'Status of the user' })
    status?: string;
}


export enum Role {
    VOLUNTEER = "Volunteer",
    ADMIN = "Admin",
};

export enum UserStatus {
    APPROVED = "Approved",
    PENDING = "Pending",
    DENIED = "Denied",
};