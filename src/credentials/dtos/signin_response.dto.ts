import { ApiProperty } from '@nestjs/swagger';
import { IUserDto, UserDto } from './user.dto';

export interface ISigninResponseDto {
  readonly user: IUserDto;
  readonly token: string;
}

export class SigninResponseDto implements ISigninResponseDto {
  @ApiProperty({
    type: UserDto,
    nullable: false,
    required: true,
  })
  readonly user: UserDto;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
  })
  readonly token: string;
}
