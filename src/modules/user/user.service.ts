import { Injectable } from '@nestjs/common';
import { ClientSession, Schema as MongooseSchema } from 'mongoose';
import { UserRepository } from '../../repositories/user.repository';
import { CreateUserDto } from './dto/createUser.dto';
import {IUser} from '../../interfaces/user.interface'
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Action } from 'src/enums/action.enum';

//this is only for demo purpose of the CASL authorization
class Article {
    id: number;
    isPublished: boolean;
    authorId: number;
  }

  /*
  The above CaslAbilityFactory is injected in user service class to run a demo
  In here we can get a user by email....
  Depending on role of the user we check wether he has ability to do something
  IF role is admin can delete article should be true,else flase

  user access should be handled in service calss of each module depending on the requirement
  
  */

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository,private caslAbilityFactory: CaslAbilityFactory) {}

    async createUser(createUserDto: CreateUserDto):Promise<IUser>{
        const createdUser = await this.userRepository.createUser(createUserDto);
        return createdUser;
    }

    async getUserById(id: MongooseSchema.Types.ObjectId):Promise<IUser>{
        return await this.userRepository.getUserById(id);
    }

    async getUserByEmail(email:string):Promise<IUser>{
        let user= (await this.userRepository.getUserByEmail(email)).toObject();
        // const ability = this.caslAbilityFactory.createForUser(user);
        // console.log(ability.can(Action.Read,Article));
        // console.log(ability.can(Action.Delete,Article))
        return (user);
    }
}