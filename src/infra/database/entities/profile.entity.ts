import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IProfileModel } from 'src/domain/models/profile.model';
import { UserEntity } from './user.entity';

@Entity({
  name: 'profile',
})
export class ProfileEntity implements IProfileModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    name: 'first_name',
  })
  firstName: string;

  @Column({
    nullable: false,
    name: 'last_name',
  })
  lastName: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
