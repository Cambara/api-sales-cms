import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IJobTitleModel } from '../../../domain/models/job_title.model';
import { EmployeeEntity } from './employee.entity';

@Entity({
  name: 'job_title',
})
export class JobTitleEntity implements IJobTitleModel {
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
    (employee: EmployeeEntity) => employee.jobTitle,
  )
  employees?: EmployeeEntity[];
}
