import { UserDto } from '../../shared/dtos/user.dto';

export enum AuthGuardStrategyEnum {
  LOCAL = 'local',
}

export const TOKEN_SERVICE_KEY = 'TOKEN_SERVICE_KEY';
export interface ITokenService {
  generate(user: UserDto): Promise<string>;
}
