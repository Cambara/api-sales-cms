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
  @IsNotEmpty()
  readonly organizationName: string;

  @IsNotEmpty()
  @IsEmail()
  @Transform(convertToLowerCase)
  readonly email: string;

  @IsNotEmpty()
  @Validate(PasswordValidator)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @Transform(convertToLowerCase)
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @Transform(convertToLowerCase)
  readonly lastName: string;

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
