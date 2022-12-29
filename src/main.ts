import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configEnum } from './config/config.loader';
import { IHttpConfig } from './config/config_loader.interface';
import { setupSwagger, setupValidation } from './config/setup.config';

async function setupHost(app: INestApplication) {
  const configService = app.get<ConfigService>(ConfigService);
  const { host, port } = configService.get<IHttpConfig>(configEnum.HTTP);
  await app.listen(port, host);
  console.log(`Started server on ${host} host and ${port} port`);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupValidation(app);
  setupSwagger(app);
  await setupHost(app);
}
bootstrap();
