class Mock {
  hash(): Promise<string> {
    return Promise.resolve('hash');
  }
  compare(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
const mock = new Mock();
export const bcryptMock = jest.mock('bcrypt', () => mock);
