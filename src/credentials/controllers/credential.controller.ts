import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/infra/auth/guards/local_auth.guard';
import {
  ITokenService,
  TOKEN_SERVICE_KEY,
} from 'src/infra/auth/protocols.interface';
import { UserDto } from 'src/shared/dtos/user.dto';
import { SigninResponseDto } from '../dtos/signin_response.dto';
import { SignupDto } from '../dtos/signup.dto';
import { SignupService } from '../services/signup.service';

@Controller('credential')
export class CredentialController {
  constructor(
    private readonly signupService: SignupService,
    @Inject(TOKEN_SERVICE_KEY)
    private readonly tokenService: ITokenService,
  ) {}

  @Post('signup')
  @ApiOperation({ description: 'create a new user' })
  @HttpCode(204)
  async signup(@Body() dto: SignupDto): Promise<void> {
    await this.signupService.handle(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @ApiOperation({ description: 'login' })
  @ApiOkResponse({ type: SigninResponseDto })
  async signin(@Request() req): Promise<SigninResponseDto> {
    const user = req.user as UserDto;
    const token = await this.tokenService.generate(user);
    return Promise.resolve({ user, token });
  }
}
