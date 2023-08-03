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

export interface IMailConfig {
  host: string;
  port: number;
  secure: boolean;
  username: string;
  password: string;
  defaultFrom: string;
}

export interface IUniqueIdentifierConfig {
  namespace: string;
}

export interface IConfigLoader {
  http: IHttpConfig;
  cryptography: ICryptographyConfig;
  jwt: IJwtConfig;
  mail: IMailConfig;
  uniqueIdentifier: IUniqueIdentifierConfig;
}
