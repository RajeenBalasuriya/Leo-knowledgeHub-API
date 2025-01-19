import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from 'src/config/config.service';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [], // Add other imports if needed
      inject: [ConfigService], // Inject ConfigService
      useFactory: async (configService: ConfigService) => ({
        global:true,
        secret: configService.getJwtSecret(), // Get the JWT secret from ConfigService
        signOptions: { expiresIn: '60s' },   // Add other sign options if needed
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService], // Export AuthService if needed by other modules
})
export class AuthModule {}
