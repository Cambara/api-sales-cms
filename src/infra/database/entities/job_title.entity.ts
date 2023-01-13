import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IJobTitleModel } from '../../../domain/models/job_title.model';

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
}
