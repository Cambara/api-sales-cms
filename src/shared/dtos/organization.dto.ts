import { ApiProperty } from '@nestjs/swagger';

export interface IOrganizationDto {
  readonly id: number;
  readonly name: string;
  readonly isActivated: boolean;
}

export class OrganizationDto implements IOrganizationDto {
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
  readonly name: string;

  @ApiProperty({
    type: Boolean,
    nullable: false,
    required: true,
  })
  readonly isActivated: boolean;
}
