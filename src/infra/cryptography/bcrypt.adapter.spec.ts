import bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcrypt.adapter';

const hashValue = 'hash';
jest.mock('bcrypt', () => ({
  hash: jest.fn(() => Promise.resolve(hashValue)),
  compare: jest.fn(() => Promise.resolve(true)),
}));

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

    it('Should return the valid hash value', async () => {
      const { cryptAdapter } = createSut();
      const hash = await cryptAdapter.encrypt('string');
      expect(hash).toEqual(hashValue);
    });
  });
});
