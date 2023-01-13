import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { SignupDto } from '../dtos/signup.dto';
import { SignupService } from '../services/signup.service';

@Controller('credential')
export class CredentialController {
  constructor(private readonly signupService: SignupService) {}

  @Post('signup')
  @ApiOperation({ description: 'create a new user' })
  @HttpCode(204)
  async signup(@Body() dto: SignupDto): Promise<void> {
    await this.signupService.handle(dto);
  }
}
