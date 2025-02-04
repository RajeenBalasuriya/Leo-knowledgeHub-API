import { Injectable } from '@nestjs/common';
import { ClientSession, Schema as MongooseSchema } from 'mongoose';
import { UserRepository } from '../../repositories/user.repository';
import { CreateUserDto } from './dto/createUser.dto';
import {IUser} from '../../interfaces/user.interface'

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async createUser(createUserDto: CreateUserDto, session: ClientSession):Promise<IUser>{
        const createdUser = await this.userRepository.createUser(createUserDto, session);
        return createdUser;
    }

    async getUserById(id: MongooseSchema.Types.ObjectId):Promise<IUser>{
        return await this.userRepository.getUserById(id);
    }

    async getUserByEmail(email:string):Promise<IUser>{
        return (await this.userRepository.getUserByEmail(email)).toObject();
    }
}