import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { IUser } from 'src/interfaces/user.interface';

@Injectable()
export class AuthService {
    constructor(private readonly userService:UserService){};

    async signIn(email:string,passwordReq:string){
        console.log(email)
        const user:IUser = await this.userService.getUserByEmail(email);
        

        if(!user){
            throw new NotFoundException();
        }
        console.log(user);
        console.log(passwordReq);
        if(user.password!=passwordReq){
            throw new UnauthorizedException();
        }

        const {password,...result}=user;
        console.log(user);

        return result;
    }
}
