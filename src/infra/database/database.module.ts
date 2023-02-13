import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../../../db/orm.config';
import { EmployeeEntity } from './entities/employee.entity';
import { JobTitleEntity } from './entities/job_title.entity';
import { LanguageEntity } from './entities/language.entity';
import { OrganizationEntity } from './entities/organization.entity';
import { ProfileEntity } from './entities/profile.entity';
import { UserEntity } from './entities/user.entity';
import { UserTestEntity } from './entities/user_test.entity';
import { TransactionHelper } from './helpers/transaction.helper';
import { EmployeeRepository } from './repositories/employee.repository';
import { JobTitleRepository } from './repositories/job_title.repository';
import { LanguageRepository } from './repositories/language.repository';
import { OrganizationRepository } from './repositories/organization.repository';
import { ProfileRepository } from './repositories/profile.repository';
import { UserRepository } from './repositories/user.repository';
import { UserTestRepository } from './repositories/user_test.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([
      EmployeeEntity,
      JobTitleEntity,
      OrganizationEntity,
      ProfileEntity,
      UserEntity,
      UserTestEntity,
      LanguageEntity,
    ]),
  ],
  providers: [
    TransactionHelper,
    UserTestRepository,
    EmployeeRepository,
    JobTitleRepository,
    OrganizationRepository,
    ProfileRepository,
    UserRepository,
    LanguageRepository,
  ],
  exports: [
    TypeOrmModule,
    TransactionHelper,
    UserTestRepository,
    EmployeeRepository,
    JobTitleRepository,
    OrganizationRepository,
    ProfileRepository,
    UserRepository,
    LanguageRepository,
  ],
})
export class DatabaseModule {}
