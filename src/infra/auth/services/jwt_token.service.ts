import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/shared/dtos/user.dto';
import { ITokenService } from '../protocols.interface';

export class JwtTokenService implements ITokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generate(user: UserDto): Promise<string> {
    const token = await this.jwtService.signAsync({ ...user });
    return token;
  }
}
