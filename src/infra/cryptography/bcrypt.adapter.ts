import { hash, compare } from 'bcrypt';
import { ICryptographyAdapter } from './cryptography.protocol';

export class BcryptAdapter implements ICryptographyAdapter {
  constructor(private salt: number) {}

  async encrypt(value: string): Promise<string> {
    return hash(value, this.salt);
  }

  async isMatch(value: string, hash: string): Promise<boolean> {
    return compare(value, hash);
  }
}
