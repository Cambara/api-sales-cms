import { IConfigLoader } from './config_loader.interface';

export enum configEnum {
  HTTP = 'http',
  CRYPTOGRAPHY = 'cryptography',
  JWT = 'jwt',
}

const getConfig = (): IConfigLoader => ({
  http: {
    host: process.env.HTTP_HOST || 'localhost',
    port: process.env.HTTP_PORT ? Number(process.env.HTTP_PORT) : 9000,
  },
  cryptography: {
    salt: Number(process.env.CRYPTOGRAPHY_SALT) || 10,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'jwt_secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
});

export { getConfig };
