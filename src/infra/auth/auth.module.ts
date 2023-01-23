import { Module, Provider, Scope } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { configEnum } from 'src/config/config.loader';
import { IJwtConfig } from 'src/config/config_loader.interface';
import { TransactionHelper } from '../database/helpers/transaction.helper';
import { UserRepository } from '../database/repositories/user.repository';
import { TOKEN_SERVICE_KEY } from './protocols.interface';
import { JwtTokenService } from './services/jwt_token.service';
import { SigninService } from './services/signin.service';
import { LocalStrategy } from './strategies/local.strategy.service';

const JwtModuleSetup = JwtModule.registerAsync({
  useFactory: async (configService: ConfigService) => {
    const jwtConfig = configService.get<IJwtConfig>(configEnum.JWT);
    return {
      secret: jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      },
    };
  },
  imports: [ConfigModule],
  inject: [ConfigService],
});

const JwtTokenServiceProvider: Provider = {
  provide: TOKEN_SERVICE_KEY,
  useFactory: (jwtService: JwtService) => new JwtTokenService(jwtService),
  inject: [JwtService],
};

@Module({
  imports: [PassportModule, JwtModuleSetup],
  providers: [
    {
      provide: TransactionHelper,
      useClass: TransactionHelper,
      scope: Scope.TRANSIENT,
    },
    UserRepository,
    SigninService,
    LocalStrategy,
    JwtTokenServiceProvider,
  ],
  exports: [JwtTokenServiceProvider],
})
export class AuthModule {}
