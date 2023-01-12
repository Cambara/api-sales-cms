import { Module } from '@nestjs/common';
import { UserTestController } from './controllers/user_test.controller';
import { UserTestService } from './services/user_test.service';

@Module({
  controllers: [UserTestController],
  providers: [UserTestService],
})
export class UserTestModule {}
