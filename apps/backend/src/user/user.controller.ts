import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
} from "@nestjs/common";
import { ApiParam } from '@nestjs/swagger';
import { UserService } from "./user.service";
import { NewUserInput } from "../dtos/newUserDTO";
import { UserModel, UserStatus, EditUserModel } from "./user.model";


/**
 * The controller for user endpoints.
 */
@Controller("users")
export class UserController {
    constructor(private userService: UserService) {}

    @Get(":id")
    public async getUser(
        @Param("id") userId?: number
        ): Promise<UserModel> {
            return this.userService.getUser(userId);
        }

    @Post("/addVolunteer")
    public async addVolunteer( @Body() userData: NewUserInput) {
        return this.userService.postUserVolunteer(userData);
    }
    
    @Get(":id/sites")
    public async getUserSites(@Param("id") userId?: number): Promise<any> {
        return this.userService.getUserTables(userId);
    }


    @Put("/editUser/:id")
    public async editUser(
        @Param("id") userId?: number, 
        @Body() editUserModel?: EditUserModel
    ): Promise<UserModel> {
        return this.userService.editUser(userId, editUserModel);
    }

    /**
     * Gets users by their status.
     * @param status The status to filter users by (e.g., Approved, Pending, Denied).
     * @returns A list of users with the specified status.
     */
    @Get("status/:status")
    @ApiParam({
        name: 'status',
        description: 'The status to filter users by (e.g., Approved, Pending, Denied)',
        enum: UserStatus,
    })
    public async getUserByStatus(
        @Param("status") status: UserStatus
    ): Promise<UserModel[]> {
        console.log(status);
        return this.userService.getUserByStatus(status);
    }




}