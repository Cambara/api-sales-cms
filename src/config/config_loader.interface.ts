export interface IHttpConfig {
  host: string;
  port: number;
}

export interface ICryptographyConfig {
  salt: number;
}

export interface IConfigLoader {
  http: IHttpConfig;
  cryptography: ICryptographyConfig;
}
