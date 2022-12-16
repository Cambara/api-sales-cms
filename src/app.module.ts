import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './config/config.loader';
import { HealthModule } from './health/health.module';
import { InfraModule } from './infra/infra.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [getConfig],
    }),
    InfraModule,
    HealthModule,
  ],
})
export class AppModule {}
