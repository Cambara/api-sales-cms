import { IUserTestModel } from '../../../domain/models/user_test.model';
import { convertDbToModal } from './user_test.mapper';

describe('UserTestMapper', () => {
  describe('convertDbToModal', () => {
    it('Should convert a db to modal', () => {
      const stub: IUserTestModel = {
        id: 1,
        name: 'test',
      };
      const result = convertDbToModal(stub);
      expect(result.id).toEqual(1);
      expect(result.name).toEqual('test');
    });
  });
});
