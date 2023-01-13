export const CRYPTOGRAPHY_KEY = 'CRYPTOGRAPHY_ADAPTER';
export interface ICryptographyAdapter {
  encrypt(value: string): Promise<string>;
  isMatch(value: string, hash: string): Promise<boolean>;
}
