import { ApiProperty } from '@nestjs/swagger';

export interface IUserTestDto {
  name: string;
}

export class UserTestDto implements IUserTestDto {
  @ApiProperty({
    type: String,
  })
  name: string;
}
