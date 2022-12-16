import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configEnum } from './config/config.loader';
import { IHttpConfig } from './config/config_loader.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const configService = app.get<ConfigService>(ConfigService);
  const { host, port } = configService.get<IHttpConfig>(configEnum.HTTP);
  await app.listen(port, host);
  console.log(`Started server on ${host} host and ${port} port`);
}
bootstrap();
