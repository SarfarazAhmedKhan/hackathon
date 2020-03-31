import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const express = require('express')
  const apps = express()
  apps.use(express.static('public'));
  app.use('/static/img', express.static('uploads'));
  app.enableCors()
  await app.listen(process.env.PORT || 4000);
}

bootstrap();