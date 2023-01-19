import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserDto } from '../../../shared/dtos/user.dto';
import { SigninService } from '../services/signin.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly signinService: SigninService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserDto> {
    const user = await this.signinService.handle({
      email: username,
      password,
    });
    return user;
  }
}
