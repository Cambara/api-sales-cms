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
  userIds: number[];
  expiredAt: Date;
  usedAt?: Date;
}

export class TemporaryTokenModel
  extends DefaultWithTimestampsModel
  implements ITemporaryTokenModel
{
  readonly token: string;
  readonly type: TemporaryTokenTypeEnum;
  readonly userIds: number[];
  readonly expiredAt: Date;
  readonly usedAt?: Date;

  constructor({ id, createdAt, updatedAt, ...data }: ITemporaryTokenModel) {
    super({ id, createdAt, updatedAt });
    this.token = data.token;
    this.type = data.type;
    this.userIds = data.userIds;
    this.expiredAt = data.expiredAt;
    this.usedAt = data.usedAt;
  }
}
