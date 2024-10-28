import {
    Controller,
    Get,
    Param,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserModel } from "./user.model";

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


}