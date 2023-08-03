import { IUniqueIdentifier } from './unique_identifier.protocol';
import { v5 as uuidv5 } from 'uuid';

export class Uuid5Adapter implements IUniqueIdentifier {
  constructor(private readonly namespace?: string) {}
  async generate(name?: string): Promise<string> {
    const value = uuidv5(
      name ?? 'name_str',
      this.namespace ?? 'default_namespace',
    );
    return Promise.resolve(value);
  }
}
