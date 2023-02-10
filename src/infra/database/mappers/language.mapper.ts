import { LanguageModel } from '../../../domain/models/language.model';
import { LanguageEntity } from '../entities/language.entity';

export const convertDbToModal = (db: LanguageEntity): LanguageModel => {
  return new LanguageModel({
    id: db.id,
    code: db.code,
    isActivated: db.isActivated,
  });
};
