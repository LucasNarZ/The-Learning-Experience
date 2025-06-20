import { Controller, Get, Body, Req, Put, UseGuards, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { UsersService } from "./users.service";
import { Request } from "express";
import { updateUserDto } from "src/dtos/updateUser.dto";
import { UserNotFoundException } from "src/exceptions/UserNotFound.exception";
import { AuthRequest } from "src/interfaces/authRequest.interface";

@Controller("user")
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    @UseGuards(AuthGuard)
    @Get("id")
    async findUser(@Req() req:AuthRequest) {
        
        const id = req.user.userId
        console.log(id)
        if(!id){
            throw new UnauthorizedException("User is not logged")
        }
        const user = await this.usersService.findUser(id)
        if(!user){
            throw new UserNotFoundException(`user with id ${id} not found`)
        }
        return user
    }

    @Get(":id/posts")
    async getUserPosts(@Req() req:Request) {
        const { id } = req.params;
        const posts = await this.usersService.getPostByUser(id)
        return posts
    }

    @UseGuards(AuthGuard)
    @Put("update")
    async updateUser(@Req() req:AuthRequest, @Body() body:updateUserDto) {
        const id = req?.user?.userId

        return await this.usersService.updateUser(id, body)
    }

}