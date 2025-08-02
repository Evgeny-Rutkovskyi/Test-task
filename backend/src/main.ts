import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './configs/env.config';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(config.port);
}
bootstrap();
