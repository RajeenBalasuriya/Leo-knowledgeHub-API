import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards,Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './dtos/signIn.dto';
import { AuthGuard } from './auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  signIn(@Body() signInDtoObj: signInDto) {
    return this.authService.signIn(signInDtoObj.email, signInDtoObj.password);
  }

  //end point to check the auth guard
  @UseGuards(AuthGuard)
  @Get('/profile')
  getProfie(@Request() req){
    return req.user;
  }

   //end point to check the auth guard

   @Get('/profiles')
   getProfies(@Request() req){
     return "Hi";
   }

}
