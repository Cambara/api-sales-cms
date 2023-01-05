import { Injectable, Scope } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';

export interface ITransactionHelper {
  startTransaction(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
  save<T>(data: T[]): Promise<T[]>;
}

@Injectable({ scope: Scope.REQUEST })
export class TransactionHelper implements ITransactionHelper {
  private queryRunner?: QueryRunner;
  constructor(private readonly dataSource: DataSource) {}

  async startTransaction(): Promise<void> {
    if (this.queryRunner) return;
    this.queryRunner = this.dataSource.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();
  }

  async commit(): Promise<void> {
    this.checkIfHasTransaction();
    await this.queryRunner.commitTransaction();
    await this.releaseConnection();
  }

  async rollback(): Promise<void> {
    this.checkIfHasTransaction();
    await this.queryRunner.rollbackTransaction();
    await this.releaseConnection();
  }

  async save<T>(data: T[]): Promise<T[]> {
    this.checkIfHasTransaction();
    return this.queryRunner.manager.save<T>(data);
  }

  private async releaseConnection(): Promise<void> {
    if (!this.queryRunner) return;
    await this.queryRunner.release();
    this.queryRunner = undefined;
  }

  private checkIfHasTransaction(): void {
    if (!this.queryRunner) throw new Error(`queryRunner doesn't exist`);
  }
}
