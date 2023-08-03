import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  ITemporaryTokenModel,
  TemporaryTokenTypeEnum,
} from '../../../domain/models/temporary_token.model';

@Entity({
  name: 'temporary_token',
})
export class TemporaryTokenEntity implements ITemporaryTokenModel {
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
    name: 'data',
    nullable: false,
    type: 'simple-json',
  })
  data: unknown;

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
}
