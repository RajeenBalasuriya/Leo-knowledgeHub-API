import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/createUser')
    async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        try {
            const newUser = await this.userService.createUser(createUserDto);
            return res.status(HttpStatus.CREATED).send(newUser);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @Post('/getUserByEmail')  // Change to POST since we are using the request body
    async getUserByEmail(@Body() body: { email: string }, @Res() res: Response) {
        const { email } = body;
        const user = await this.userService.getUserByEmail(email);  
        if (!user) {
            return res.status(HttpStatus.NOT_FOUND).send({ message: 'User not found' });
        }
        return res.status(HttpStatus.OK).send(user);
    }
}
