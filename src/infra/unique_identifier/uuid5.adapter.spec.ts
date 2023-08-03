import { Uuid5Adapter } from './uuid5.adapter';

jest.mock('uuid', () => ({
  v5: jest.fn(() => 'generated_str'),
}));

describe('Uuid5Adapter', () => {
  afterEach(async () => {
    await jest.clearAllMocks();
  });

  describe('generate', () => {
    it('should generate a valid string', async () => {
      const adapter = new Uuid5Adapter();
      const result = await adapter.generate('random_str');
      expect(result).toEqual('generated_str');
    });

    it('should generate a valid string without passing a name', async () => {
      const adapter = new Uuid5Adapter();
      const result = await adapter.generate();
      expect(result).toEqual('generated_str');
    });
  });
});
