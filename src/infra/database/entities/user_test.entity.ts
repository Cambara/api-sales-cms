import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUserTestModel } from '../../../domain/models/user_test.model';

@Entity({
  name: 'user_test',
})
export class UserTestEntity implements IUserTestModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
