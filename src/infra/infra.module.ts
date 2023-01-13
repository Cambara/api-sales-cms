import { Global, Module } from '@nestjs/common';
import { CryptographyModule } from './cryptography/cryptography.module';
import { DatabaseModule } from './database/database.module';

@Global()
@Module({
  imports: [DatabaseModule, CryptographyModule],
  exports: [DatabaseModule, CryptographyModule],
})
export class InfraModule {}
