import { OrganizationModel } from '../../../domain/models/organization.model';
import { OrganizationEntity } from '../entities/organization.entity';

export const convertDbToModal = (db: OrganizationEntity): OrganizationModel => {
  return new OrganizationModel({
    id: db.id,
    name: db.name,
    isActivated: db.isActivated,
    createdAt: db.createdAt,
    updatedAt: db.updatedAt,
  });
};
