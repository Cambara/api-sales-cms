import { ICryptographyAdapter } from './cryptography.protocol';

export class CryptographyMockAdapter implements ICryptographyAdapter {
  async encrypt(value: string): Promise<string> {
    return Promise.resolve(`${value}_encripty`);
  }

  async isMatch(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
