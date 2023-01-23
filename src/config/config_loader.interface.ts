export interface IHttpConfig {
  host: string;
  port: number;
}

export interface ICryptographyConfig {
  salt: number;
}

export interface IJwtConfig {
  secret: string;
  expiresIn: string;
}

export interface IConfigLoader {
  http: IHttpConfig;
  cryptography: ICryptographyConfig;
  jwt: IJwtConfig;
}
