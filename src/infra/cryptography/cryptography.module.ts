import { Module } from '@nestjs/common';
import { CRYPTOGRAPHY_KEY } from './cryptography.protocol';
import { CryptographyMockAdapter } from './mock.adapter';

const CryptographyAdapter = {
  provide: CRYPTOGRAPHY_KEY,
  useClass: CryptographyMockAdapter,
};

@Module({
  providers: [CryptographyAdapter],
  exports: [CryptographyAdapter],
})
export class CryptographyModule {}
