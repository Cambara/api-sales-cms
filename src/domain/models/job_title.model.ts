import { DefaultModel, IDefaultModel } from './default.model';

export interface IJobTitleModel extends IDefaultModel {
  name: string;
  isActivated: boolean;
}

export class JobTitleModel extends DefaultModel implements IJobTitleModel {
  name: string;
  isActivated: boolean;

  constructor({ id, ...data }: IJobTitleModel) {
    super({ id });
    this.name = data.name;
    this.isActivated = data.isActivated;
  }
}
