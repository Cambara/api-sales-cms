import { getRepositoryToken } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { IDefaultMockEntity } from './infra/database/entities/default_mock_entity.interface';

export const createEntityMockProvider = (
  entity: EntityClassOrSchema,
  mock: IDefaultMockEntity,
) => ({
  provide: getRepositoryToken(entity),
  useValue: mock,
});

export const createMockProvider = (provide: any, mock: any) => ({
  provide,
  useValue: mock,
});

export const createUseClassMockProvider = (provide: any, mock: any) => ({
  provide,
  useClass: mock,
});
