import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../../../db/orm.config';
import { UserTestEntity } from './entities/user_test.entity';
import { UserTestRepository } from './repositories/user_test.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([UserTestEntity]),
  ],
  providers: [UserTestRepository],
  exports: [TypeOrmModule, UserTestRepository],
})
export class DatabaseModule {}
