import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { convertToLowerCase } from '../../shared/helpers/string.helper';

export interface ISigninRequestDto {
  readonly email: string;
  readonly password: string;
}

export class SigninRequestDto implements ISigninRequestDto {
  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  @Transform(convertToLowerCase)
  readonly email: string;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
  })
  @IsNotEmpty()
  readonly password: string;
}
