import { UserModel } from '../../../domain/models/user.model';
import { UserEntity } from '../entities/user.entity';
import { convertDbToModel as profileConvertDbToModel } from './profile.mapper';
import { convertDbToModel as employeeConvertDbToModel } from './employee.mapper';

export const convertDbToModel = (db: UserEntity): UserModel => {
  return new UserModel({
    id: db.id,
    email: db.email,
    password: db.password,
    isBlocked: db.isBlocked,
    languageCode: db.languageCode,
    createdAt: db.createdAt,
    updatedAt: db.updatedAt,
    profile: db.profile ? profileConvertDbToModel(db.profile) : undefined,
    employees: Array.isArray(db.employees)
      ? db.employees.map(employeeConvertDbToModel)
      : undefined,
  });
};
