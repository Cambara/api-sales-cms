export interface IJobTitleModel {
  id: number;
  name: string;
  isActivated: boolean;
}

export class JobTitleModel implements IJobTitleModel {
  id: number;
  name: string;
  isActivated: boolean;

  constructor(data: IJobTitleModel) {
    this.id = data.id;
    this.name = data.name;
    this.isActivated = data.isActivated;
  }
}
