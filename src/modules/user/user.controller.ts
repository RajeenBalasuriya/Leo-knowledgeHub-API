import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Response } from 'express';
import { Connection, Schema as MongooseSchema } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';



@Controller('user')
export class UserController {
    constructor(@InjectConnection() private readonly mongoConnection: Connection, private userService: UserService,) {}

    @Post('/createUser')
    async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            const newUser: any = await this.userService.createUser(createUserDto, session);
            await session.commitTransaction();
            return res.status(HttpStatus.CREATED).send(newUser);
        } catch (error) {
            await session.abortTransaction();
            throw new BadRequestException(error);
        } finally {
            session.endSession();
        }
    }


  @Post('/getUserByEmail')  // Change to POST since we are using the request body
  async getUserByEmail(@Body() body: { email: string }, @Res() res: Response) {
    const { email } = body;
    const user = await this.userService.getUserByEmail(email);  // Assuming a method like getUserByEmail exists in your service
    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).send({ message: 'User not found' });
    }
    return res.status(HttpStatus.OK).send(user);
  }

  


   
}