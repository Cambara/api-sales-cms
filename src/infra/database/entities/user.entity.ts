import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IUserModel } from 'src/domain/models/user.model';
import { IProfileModel } from 'src/domain/models/profile.model';
import { ProfileEntity } from './profile.entity';

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
  profile: IProfileModel;

  @CreateDateColumn({
    name: 'create_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt?: Date;
}
