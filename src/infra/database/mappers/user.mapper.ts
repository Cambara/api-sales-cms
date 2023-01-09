import { UserModel } from '../../../domain/models/user.model';
import { UserEntity } from '../entities/user.entity';

export const convertDbToModel = (db: UserEntity): UserModel => {
  return new UserModel({
    id: db.id,
    email: db.email,
    password: db.password,
    isBlocked: db.isBlocked,
    createdAt: db.createdAt,
    updatedAt: db.updatedAt,
  });
};
