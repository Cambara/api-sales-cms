import { IOrganizationModel } from '../../../domain/models/organization.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'organization',
})
export class OrganizationEntity implements IOrganizationModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  @Column()
  name: string;

  @Column({
    name: 'is_activated',
    nullable: false,
  })
  isActivated: boolean;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
