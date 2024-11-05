import {
    Controller,
    Get,
    Param,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserModel, UserStatus } from "./user.model";

/**
 * The controller for user endpoints.
 */
@Controller("user")
export class UserController {
    constructor(private userService: UserService) {}

    @Get(":id")
    public async getUser(
        @Param("id") userId?: number
        ): Promise<UserModel> {
            return this.userService.getUser(userId);
        }

    
    @Get(":id/sites")
    public async getUserSites(@Param("id") userId?: number): Promise<any> {
        return this.userService.getUserTables(userId);
    }

    
    /**
     * Gets users by their status.
     * @param status The status to filter users by (e.g., Approved, Pending, Denied).
     * @returns A list of users with the specified status.
     */
    @Get("status/:status")
    public async getUserByStatus(
        @Param("status") status: UserStatus
    ): Promise<UserModel[]> {
        console.log(status);
        return this.userService.getUserByStatus(status);
    }
}



