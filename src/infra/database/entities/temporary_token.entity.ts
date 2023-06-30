import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  ITemporaryTokenModel,
  TemporaryTokenTypeEnum,
} from '../../../domain/models/temporary_token.model';
import { UserEntity } from './user.entity';

type TemporaryTokenEntityType = Omit<ITemporaryTokenModel, 'userIds'>;

@Entity({
  name: 'employee',
})
export class TemporaryTokenEntity implements TemporaryTokenEntityType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'token',
    nullable: false,
  })
  token: string;

  @Column({
    name: 'type',
    nullable: false,
  })
  type: TemporaryTokenTypeEnum;

  @Column({
    name: 'token',
    nullable: false,
  })
  expiredAt: Date;

  @Column({
    name: 'used_at',
    nullable: true,
  })
  usedAt?: Date;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt?: Date;

  @ManyToMany(() => UserEntity, (user) => user.id)
  @JoinTable({
    name: 'user_has_temporary_token',
    joinColumn: { name: 'temporary_token_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  users: UserEntity[];
}
