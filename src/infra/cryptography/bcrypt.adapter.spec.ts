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
  afterEach(async () => {
    await jest.clearAllMocks();
  });

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

  describe('isMatch', () => {
    it('Should match the value with hash', async () => {
      const { cryptAdapter } = createSut();
      jest.spyOn(bcrypt, 'compare');
      const value = 'string';
      const isValid = await cryptAdapter.isMatch(value, hashValue);

      expect(isValid).toBe(true);
      expect(bcrypt.compare).toBeCalledTimes(1);
      expect(bcrypt.compare).toHaveBeenCalledWith(value, hashValue);
    });

    it('Should return a invalid value', async () => {
      const { cryptAdapter } = createSut();
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementationOnce(() => Promise.resolve(false));
      const value = 'string';
      const isValid = await cryptAdapter.isMatch(value, hashValue);

      expect(isValid).toBe(false);
    });
  });
});
