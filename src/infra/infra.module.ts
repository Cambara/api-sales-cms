import { Global, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CryptographyModule } from './cryptography/cryptography.module';
import { DatabaseModule } from './database/database.module';
import { MailModule } from './mail/mail.module';

@Global()
@Module({
  imports: [DatabaseModule, CryptographyModule, AuthModule, MailModule],
  exports: [DatabaseModule, CryptographyModule, AuthModule, MailModule],
})
export class InfraModule {}
