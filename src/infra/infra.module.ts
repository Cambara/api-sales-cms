import { Global, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CryptographyModule } from './cryptography/cryptography.module';
import { DatabaseModule } from './database/database.module';

@Global()
@Module({
  imports: [DatabaseModule, CryptographyModule, AuthModule],
  exports: [DatabaseModule, CryptographyModule, AuthModule],
})
export class InfraModule {}
