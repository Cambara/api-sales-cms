export interface IDefaultMockEntity {
  find(dto: unknown): Promise<unknown>;
  findOne(dto: unknown): Promise<unknown>;
}
