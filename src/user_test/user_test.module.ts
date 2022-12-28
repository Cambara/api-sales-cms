import { Module } from '@nestjs/common';
import { InfraModule } from 'src/infra/infra.module';
import { UserTestController } from './controllers/user_test.controller';
import { UserTestService } from './services/user_test.service';

@Module({
  imports: [InfraModule],
  controllers: [UserTestController],
  providers: [UserTestService],
})
export class UserTestModule {}
