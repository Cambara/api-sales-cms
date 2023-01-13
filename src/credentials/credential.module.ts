import { Module } from '@nestjs/common';
import { CredentialController } from './controllers/credential.controller';
import { SignupService } from './services/signup.service';

@Module({
  controllers: [CredentialController],
  providers: [SignupService],
})
export class CredentialModule {}
