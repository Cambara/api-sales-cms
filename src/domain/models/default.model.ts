export interface IDefaultModel {
  id: number;
}

export interface IDefaultWithTimestampsModel extends IDefaultModel {
  createdAt?: Date;
  updatedAt?: Date;
}

export abstract class DefaultModel implements IDefaultModel {
  id!: number;
  constructor({ id }: IDefaultModel) {
    this.id = id;
  }
}

export abstract class DefaultWithTimestampsModel
  implements IDefaultWithTimestampsModel
{
  id!: number;
  createdAt!: Date;
  updatedAt!: Date;
  constructor({ id }: IDefaultWithTimestampsModel) {
    this.id = id;
    this.createdAt;
    this.updatedAt;
  }
}
