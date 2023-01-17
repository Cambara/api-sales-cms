import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IUserModel } from 'src/domain/models/user.model';
import { ProfileEntity } from './profile.entity';
import { IEmployeeModel } from 'src/domain/models/employee.model';
import { EmployeeEntity } from './employee.entity';

@Entity({
  name: 'user',
})
export class UserEntity implements IUserModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  email: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: false,
    name: 'is_blocked',
  })
  isBlocked: boolean;

  @OneToOne(() => ProfileEntity, (profile: ProfileEntity) => profile.user)
  profile: ProfileEntity;

  @OneToMany(() => EmployeeEntity, (employee: EmployeeEntity) => employee.user)
  employees?: EmployeeEntity[];

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt?: Date;
}
