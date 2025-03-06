import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './config/config.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CoursesModule } from './modules/courses/courses.module';
import { PolicyModule } from './modules/policy/policy.module';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      inject:[ConfigService],
      useFactory:async (configService: ConfigService) => configService.getMongoConfig()
    }),
    UserModule,
    AuthModule,
    CoursesModule,
    PolicyModule,
    CaslModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
