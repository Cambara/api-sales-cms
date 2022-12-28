import { UserTestModel } from '../../domain/models/user_test.model';
import { UserTestDto } from '../dtos/user_test.dto';

export const convertModalToDto = (
  userTestModel: UserTestModel,
): UserTestDto => {
  const dto = new UserTestDto();
  dto.name = userTestModel.name;
  return dto;
};
