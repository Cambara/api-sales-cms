import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './config/config.loader';
import { HealthModule } from './health/health.module';
// import { InfraModule } from './infra/infra.module';
// import { UserTestModule } from './user_test/user_test.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [getConfig],
    }),
    // InfraModule,
    HealthModule,
    // UserTestModule,
  ],
})
export class AppModule {}
