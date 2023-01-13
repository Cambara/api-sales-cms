import { createUseClassMockProvider } from '../../../mocks/create_mock.helper';
import {
  ICryptographyAdapter,
  CRYPTOGRAPHY_KEY,
} from '../../../../src/infra/cryptography/cryptography.protocol';

export class Mock implements ICryptographyAdapter {
  async encrypt(value: string): Promise<string> {
    return Promise.resolve(`${value}_encrypted`);
  }

  async isMatch(): Promise<boolean> {
    return Promise.resolve(true);
  }
}

export const CryptographyAdapterMock = createUseClassMockProvider(
  CRYPTOGRAPHY_KEY,
  Mock,
);
