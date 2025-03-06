import { IsNotEmpty, IsString } from 'class-validator';
import {IUser} from '../../../interfaces/user.interface'

export class CreateUserDto implements IUser{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    role: any;

    @IsString()
    @IsNotEmpty()
    policy: string;

    @IsNotEmpty()
    password:string;
}