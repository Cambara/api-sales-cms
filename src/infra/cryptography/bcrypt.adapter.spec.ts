import bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcrypt.adapter';
import {} from 'test/mocks/libs/bcrypt/bcrypt.mock';

const createSut = () => {
  const salt = 10;
  const cryptAdapter = new BcryptAdapter(salt);
  return {
    cryptAdapter,
    salt,
  };
};

describe('BcryptAdapter', () => {
  describe('encrypt', () => {
    it('Should use the salt class value', async () => {
      const { salt, cryptAdapter } = createSut();
      jest.spyOn(bcrypt, 'hash');
      const value = 'string';
      await cryptAdapter.encrypt(value);

      expect(bcrypt.hash).toBeCalledTimes(1);
      expect(bcrypt.hash).toHaveBeenCalledWith(value, salt);
    });
  });
});
