import { TemporaryTokenModel } from '../../../domain/models/temporary_token.model';
import { TemporaryTokenEntity } from '../entities/temporary_token.entity';

export const convertDbToModel = (
  db: TemporaryTokenEntity,
): TemporaryTokenModel => {
  return new TemporaryTokenModel({
    id: db.id,
    token: db.token,
    type: db.type,
    data: db.data,
    expiredAt: db.expiredAt,
    createdAt: db.createdAt,
    updatedAt: db.updatedAt,
    usedAt: db.usedAt,
  });
};
