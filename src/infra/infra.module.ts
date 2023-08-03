import { Global, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CryptographyModule } from './cryptography/cryptography.module';
import { DatabaseModule } from './database/database.module';
import { MailModule } from './mail/mail.module';
import { UniqueIdentifierModule } from './unique_identifier/unique_identifier.module';

@Global()
@Module({
  imports: [
    DatabaseModule,
    CryptographyModule,
    AuthModule,
    MailModule,
    UniqueIdentifierModule,
  ],
  exports: [
    DatabaseModule,
    CryptographyModule,
    AuthModule,
    MailModule,
    UniqueIdentifierModule,
  ],
})
export class InfraModule {}
