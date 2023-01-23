export class JwtServiceMock {
  constructor(private readonly jwtTokenValue: string) {}
  async signAsync(): Promise<string> {
    return Promise.resolve(this.jwtTokenValue);
  }
}
