import { PasswordValidator } from './password.validator';
const passwordValidator = new PasswordValidator();

describe('PasswordValidator', () => {
  describe('validate', () => {
    it('Should test the valid password', () => {
      const suts = [
        'Test#2020',
        'test$123&E',
        '@124Tgfs',
        'a1@TEHGG',
        'Ta#1vfdg123456789235',
        'Ta#1vf',
      ];
      const results = suts.map((sut) => passwordValidator.validate(sut));
      expect(results.includes(false)).toEqual(false);
    });

    it(`Should return false when doesn't contain any lowercase character`, () => {
      const sut = 'TEST#2020';
      const result = passwordValidator.validate(sut);
      expect(result).toEqual(false);
    });

    it(`Should return false when doesn't contain any uppercase character`, () => {
      const sut = 'test#2020';
      const result = passwordValidator.validate(sut);
      expect(result).toEqual(false);
    });

    it(`Should return false when doesn't contain any special character`, () => {
      const sut = 'testT2020';
      const result = passwordValidator.validate(sut);
      expect(result).toEqual(false);
    });

    it(`Should return false when doesn't contain any number`, () => {
      const sut = 'test#TEST';
      const result = passwordValidator.validate(sut);
      expect(result).toEqual(false);
    });

    it(`Should return false when the length is less than 6 characters`, () => {
      const sut = 'Ta#1';
      const result = passwordValidator.validate(sut);
      expect(result).toEqual(false);
    });

    it(`Should return false when the length is more than 20 characters`, () => {
      const sut = 'Ta#1vfdg123456789235O';
      const result = passwordValidator.validate(sut);
      expect(result).toEqual(false);
    });
  });
});
