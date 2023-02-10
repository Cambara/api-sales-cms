import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ILanguageModel } from '../../../domain/models/language.model';

@Entity({
  name: 'language',
})
export class LanguageEntity implements ILanguageModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  @Column()
  code: string;

  @Column({
    name: 'is_activated',
    nullable: false,
  })
  isActivated: boolean;
}
