import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { IUser } from 'src/interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly userService:UserService,private readonly JwtService:JwtService){};

    async signIn(email:string,passwordReq:string):Promise<{access_token:string}>{
        
        const user:IUser = await this.userService.getUserByEmail(email);
        

        if(!user){
            throw new NotFoundException();
        }
   
        if(user.password!=passwordReq){
            throw new UnauthorizedException();
        }

        const payload={sub:user.id,email:user.email,name:user.name};

        return{
            access_token:await this.JwtService.signAsync(payload)
        }
    }
}
