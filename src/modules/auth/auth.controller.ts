import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './dtos/signIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
   signIn(@Body() signInDtoObj:signInDto ){

    return this.authService.signIn(signInDtoObj.email,signInDtoObj.password);
    
  }
}
