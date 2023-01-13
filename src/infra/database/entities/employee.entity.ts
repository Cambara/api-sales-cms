import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IEmployeeModel } from 'src/domain/models/employee.model';
import { UserEntity } from './user.entity';
import { OrganizationEntity } from './organization.entity';
import { JobTitleEntity } from './job_title.entity';

@Entity({
  name: 'employee',
})
export class EmployeeEntity implements IEmployeeModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'is_owner',
    nullable: false,
  })
  isOwner: boolean;

  @Column({
    name: 'is_activated',
    nullable: false,
  })
  isActivated: boolean;

  @Column({
    nullable: false,
    name: 'is_blocked',
  })
  isBlocked: boolean;

  @OneToOne(() => OrganizationEntity)
  @JoinColumn({ name: 'organization_id' })
  organization: OrganizationEntity;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToOne(() => JobTitleEntity)
  @JoinColumn({ name: 'job_title_id' })
  jobTitle?: JobTitleEntity;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt?: Date;
}
