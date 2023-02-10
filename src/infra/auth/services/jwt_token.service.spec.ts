import { JwtService } from '@nestjs/jwt';
import { JwtServiceMock } from '../../../../test/mocks/lib/jwt_service.mock';
import { UserDto } from '../../../shared/dtos/user.dto';
import { JwtTokenService } from './jwt_token.service';

const createSut = () => {
  const jwtTokenValue = 'JWT_TOKEN_VALUE';
  const jwtServiceMock = new JwtServiceMock(
    jwtTokenValue,
  ) as undefined as JwtService;
  const jwtTokenService = new JwtTokenService(jwtServiceMock);
  return {
    jwtTokenService,
    jwtServiceMock,
    jwtTokenValue,
  };
};

describe('JwtTokenService', () => {
  afterEach(async () => {
    await jest.clearAllMocks();
  });

  describe('generate', () => {
    it('should generate a valid token', async () => {
      const { jwtServiceMock, jwtTokenService, jwtTokenValue } = createSut();
      jest.spyOn(jwtServiceMock, 'signAsync');

      const userDto: UserDto = {
        email: 'email',
        employees: [],
        id: 1,
        languageCode: 'en',
        profile: {
          firstName: 'fist_name',
          lastName: 'last_name',
        },
      };
      const result = await jwtTokenService.generate(userDto);
      expect(result).toEqual(jwtTokenValue);
      expect(jwtServiceMock.signAsync).toBeCalledTimes(1);
      expect(jwtServiceMock.signAsync).toBeCalledWith(userDto);
    });
  });
});
