export interface IUserTestModel {
  id: number;
  name: string;
}

export class UserTestModel implements IUserTestModel {
  id: number;
  name: string;
  constructor(data: IUserTestModel) {
    this.id = data.id;
    this.name = data.name;
  }
}
