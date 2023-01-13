import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'passwordValidator', async: false })
export class PasswordValidator implements ValidatorConstraintInterface {
  private readonly expression =
    /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{6,20}$/;

  validate(value: any): boolean {
    return this.expression.test(value);
  }
  defaultMessage({ property }: ValidationArguments): string {
    return `${property} must be: - between 6 and 20 characters; and - contain one or more characters with lowercase, uppercase or special characters;`;
  }
}
