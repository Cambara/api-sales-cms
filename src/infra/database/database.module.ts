import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../../../db/orm.config';
import { JobTitleEntity } from './entities/job_title.entity';
import { OrganizationEntity } from './entities/organization.entity';
import { UserTestEntity } from './entities/user_test.entity';
import { TransactionHelper } from './helpers/transaction.helper';
import { OrganizationRepository } from './repositories/organization.repository';
import { UserTestRepository } from './repositories/user_test.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([
      UserTestEntity,
      JobTitleEntity,
      OrganizationEntity,
    ]),
  ],
  providers: [TransactionHelper, UserTestRepository, OrganizationRepository],
  exports: [
    TypeOrmModule,
    TransactionHelper,
    UserTestRepository,
    OrganizationRepository,
  ],
})
export class DatabaseModule {}
