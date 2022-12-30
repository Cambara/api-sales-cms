export interface IHttpConfig {
  host: string;
  port: number;
}
export interface IConfigLoader {
  http: IHttpConfig;
}
