export const UNIQUE_IDENTIFIER_ADAPTER_KEY = 'UNIQUE_IDENTIFIER_ADAPTER';

export interface IUniqueIdentifier {
  generate(name?: string): Promise<string>;
}
