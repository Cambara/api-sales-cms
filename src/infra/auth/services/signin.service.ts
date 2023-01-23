import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CRYPTOGRAPHY_KEY,
  ICryptographyAdapter,
} from '../../cryptography/cryptography.protocol';
import { UserRepository } from '../../database/repositories/user.repository';
import { UserDto } from '../../../shared/dtos/user.dto';
import { convertModelToDto } from '../../../shared/mappers/user.mapper';

export interface ISigninServiceHandle {
  email: string;
  password: string;
}

export interface ISigninService {
  handle(dto: ISigninServiceHandle): Promise<UserDto>;
}

@Injectable()
export class SigninService implements ISigninService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(CRYPTOGRAPHY_KEY)
    private readonly cryptographyAdapter: ICryptographyAdapter,
  ) {}

  async handle({ email, password }: ISigninServiceHandle): Promise<UserDto> {
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new NotFoundException('Not found a user');
    }

    const isValidPassword = await this.cryptographyAdapter.isMatch(
      password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Wrong password');
    }

    if (!user.canAuthenticate()) {
      throw new UnauthorizedException('you can not use the system');
    }

    return convertModelToDto(user);
  }
}
