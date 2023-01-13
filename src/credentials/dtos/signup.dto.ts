import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';
import { convertToLowerCase } from '../../shared/helpers/string.helper';
import { PasswordValidator } from '../../shared/validators/password.validator';

export interface ISignupDto {
  readonly organizationName: string;
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
}

export class SignupDto implements ISignupDto {
  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
  })
  @IsNotEmpty()
  readonly organizationName: string;

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
  @Validate(PasswordValidator)
  readonly password: string;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Transform(convertToLowerCase)
  readonly firstName: string;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Transform(convertToLowerCase)
  readonly lastName: string;
}
