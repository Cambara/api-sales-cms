import { UserTestModel } from '../../../domain/models/user_test.model';
import { UserTestEntity } from '../entities/user_test.entity';

export const convertDbToModal = (
  userTestEntity: UserTestEntity,
): UserTestModel => {
  return new UserTestModel({
    id: userTestEntity.id,
    name: userTestEntity.name,
  });
};
