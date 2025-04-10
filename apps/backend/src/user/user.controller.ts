import {
  Controller,
  UseGuards,
  Get,
  Post,
  Body,
  Param,
  Put,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiParam } from '@nestjs/swagger';
import { UserService } from "./user.service";
import { NewUserInput } from "../dtos/newUserDTO";
import { UserModel, UserStatus, EditUserModel, Role } from "./user.model";
import { ApiTags } from '@nestjs/swagger';


/**
 * The controller for user endpoints.
 */
@ApiTags('Users')
@Controller("users")
export class UserController {
  constructor(private userService: UserService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get(":id")
  public async getUser(
    @Param("id") userId?: number
  ): Promise<UserModel> {
    return this.userService.getUser(userId);
  }


  @UseGuards(AuthGuard('jwt'))
  @Post("/addVolunteer")
  public async addVolunteer(@Body() userData: NewUserInput) {
    return this.userService.postUser(userData, Role.VOLUNTEER);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('addAdmin')
  public async addAdmin(@Body() userData: NewUserInput) {
    return this.userService.postUser(userData, Role.ADMIN);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(":id/sites")
  public async getUserSites(@Param("id") userId?: number): Promise<any> {
    return this.userService.getUserTables(userId);
  }

  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
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
