import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UserTestDto } from '../dtos/user_test.dto';
import { UserTestService } from '../services/user_test.service';

@Controller('user-test')
export class UserTestController {
  constructor(private readonly userTestService: UserTestService) {}
  @Get()
  @ApiOperation({ description: 'get the user tests' })
  @ApiOkResponse({ type: UserTestDto, isArray: true })
  async getUserTests(): Promise<UserTestDto[]> {
    return this.userTestService.findAll();
  }
}
