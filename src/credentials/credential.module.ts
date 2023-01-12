import { Module } from '@nestjs/common';
import { InfraModule } from '../infra/infra.module';
import { CredentialController } from './controllers/credential.controller';
import { SignupService } from './services/signup.service';

@Module({
  imports: [InfraModule],
  controllers: [CredentialController],
  providers: [SignupService],
})
export class CredentialModule {}
