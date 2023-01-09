import { ProfileModel } from '../../../domain/models/profile.model';
import { ProfileEntity } from '../entities/profile.entity';

export const convertDbToModel = (db: ProfileEntity): ProfileModel => {
  return new ProfileModel({
    id: db.id,
    firstName: db.firstName,
    lastName: db.lastName,
  });
};
