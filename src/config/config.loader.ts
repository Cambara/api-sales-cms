import { IConfigLoader } from './config_loader.interface';

export enum configEnum {
  HTTP = 'http',
}

const getConfig = (): IConfigLoader => ({
  http: {
    host: process.env.HTTP_HOST || 'localhost',
    port: process.env.HTTP_PORT ? Number(process.env.HTTP_PORT) : 9000,
  },
});

export { getConfig };
