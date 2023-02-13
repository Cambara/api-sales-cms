import { DefaultModel, IDefaultModel } from './default.model';

export interface ILanguageModel extends IDefaultModel {
  code: string;
  isActivated: boolean;
}

export class LanguageModel extends DefaultModel implements ILanguageModel {
  code: string;
  isActivated: boolean;

  constructor({ id, ...data }: ILanguageModel) {
    super({ id });
    this.code = data.code;
    this.isActivated = data.isActivated;
  }
}
