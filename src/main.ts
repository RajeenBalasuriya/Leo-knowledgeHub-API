import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Use the ConfigService from the app's dependency injection context
  const configService = app.get(ConfigService);
  await app.listen(await configService.getPortConfig());
}
bootstrap();
