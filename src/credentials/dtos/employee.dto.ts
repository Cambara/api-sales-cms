import { ApiProperty } from '@nestjs/swagger';
import { IOrganizationDto, OrganizationDto } from './organization.dto';

export interface IEmployeeDto {
  readonly id: number;
  readonly isActivated: boolean;
  readonly isOwner: boolean;
  readonly isBlocked: boolean;
  readonly organization: IOrganizationDto;
  readonly jobTitle?: string;
}

export class EmployeeDto implements IEmployeeDto {
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
  readonly isActivated: boolean;

  @ApiProperty({
    type: Boolean,
    nullable: false,
    required: true,
    default: false,
  })
  readonly isOwner: boolean;

  @ApiProperty({
    type: Boolean,
    nullable: false,
    required: true,
  })
  readonly isBlocked: boolean;

  @ApiProperty({
    type: OrganizationDto,
    nullable: false,
    required: true,
  })
  readonly organization: OrganizationDto;

  @ApiProperty({
    type: String,
    nullable: true,
    required: false,
  })
  readonly jobTitle?: string;
}
