import { ApiProperty } from '@nestjs/swagger';
import { EmployeeDto, IEmployeeDto } from './employee.dto';
import { IProfileDto, ProfileDto } from './profile.dto';

export interface IUserDto {
  readonly id: number;
  readonly email: string;
  readonly profile: IProfileDto;
  readonly employees: IEmployeeDto[];
}

export class UserDto implements IUserDto {
  @ApiProperty({
    type: Number,
    nullable: false,
    required: true,
  })
  readonly id: number;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
  })
  readonly email: string;

  @ApiProperty({
    type: ProfileDto,
    nullable: false,
    required: true,
  })
  readonly profile: ProfileDto;

  @ApiProperty({
    type: EmployeeDto,
    nullable: false,
    required: true,
    isArray: true,
  })
  readonly employees: EmployeeDto[];
}
