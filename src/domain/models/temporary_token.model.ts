import {
  DefaultWithTimestampsModel,
  IDefaultWithTimestampsModel,
} from './default.model';

export enum TemporaryTokenTypeEnum {
  FORGOT_PASSWORD = 'forgot_password',
}

export interface ITemporaryTokenModel extends IDefaultWithTimestampsModel {
  token: string;
  type: TemporaryTokenTypeEnum;
  data: unknown;
  expiredAt: Date;
  usedAt?: Date;
}

export class TemporaryTokenModel
  extends DefaultWithTimestampsModel
  implements ITemporaryTokenModel
{
  readonly token: string;
  readonly type: TemporaryTokenTypeEnum;
  readonly data: unknown;
  readonly expiredAt: Date;
  readonly usedAt?: Date;

  constructor({ id, createdAt, updatedAt, ...dto }: ITemporaryTokenModel) {
    super({ id, createdAt, updatedAt });
    this.token = dto.token;
    this.type = dto.type;
    this.data = dto.data;
    this.expiredAt = dto.expiredAt;
    this.usedAt = dto.usedAt;
  }
}
