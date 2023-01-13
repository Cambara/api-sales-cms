import { createMockProvider } from '../../../create_mock.helper';
import { OrganizationModel } from '../../../../../src/domain/models/organization.model';
import {
  OrganizationRepository,
  IOrganizationRepository,
  ICreateDto,
} from '../../../../../src/infra/database/repositories/organization.repository';

class Mock implements IOrganizationRepository {
  create({ name }: ICreateDto): Promise<OrganizationModel> {
    const row = new OrganizationModel({
      id: 1,
      isActivated: true,
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return Promise.resolve(row);
  }
}

export const OrganizationRepositoryMock = createMockProvider(
  OrganizationRepository,
  new Mock(),
);
