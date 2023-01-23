import { IOrganizationModel } from '../../../domain/models/organization.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EmployeeEntity } from './employee.entity';

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

  @OneToMany(
    () => EmployeeEntity,
    (employee: EmployeeEntity) => employee.organization,
  )
  employees: EmployeeEntity[];

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
