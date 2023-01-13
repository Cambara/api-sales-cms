import {
  ITransactionHelper,
  TransactionHelper,
} from '../../../../../src/infra/database/helpers/transaction.helper';
import { createMockProvider } from '../../../../mocks/create_mock.helper';

export interface ITransactionHelperMockFeatures {
  save(data: any[]): any[];
}

class TransactionHelperMock implements ITransactionHelper {
  constructor(private readonly features: ITransactionHelperMockFeatures) {}

  async startTransaction(): Promise<void> {
    await Promise.resolve();
  }

  async commit(): Promise<void> {
    await Promise.resolve();
  }

  async rollback(): Promise<void> {
    await Promise.resolve();
  }

  async save(data: any[]): Promise<any[]> {
    return Promise.resolve(this.features.save(data));
  }
}

export const TransactionHelperMockFactory = (
  features: ITransactionHelperMockFeatures,
) => createMockProvider(TransactionHelper, new TransactionHelperMock(features));
