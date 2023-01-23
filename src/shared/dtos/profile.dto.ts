import { ApiProperty } from '@nestjs/swagger';

export interface IProfileDto {
  readonly firstName: string;
  readonly lastName: string;
}

export class ProfileDto implements IProfileDto {
  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
  })
  readonly firstName: string;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
  })
  readonly lastName: string;
}
