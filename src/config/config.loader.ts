import { IConfigLoader } from './config_loader.interface';

export enum configEnum {
  HTTP = 'http',
  CRYPTOGRAPHY = 'cryptography',
  JWT = 'jwt',
  MAIL = 'mail',
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
  mail: {
    host: process.env.MAIL_HOST || 'MAIL_HOST',
    port: process.env.MAIL_PORT ? Number(process.env.MAIL_PORT) : 2525,
    secure: process.env.MAIL_SECURE
      ? Boolean(Number(process.env.MAIL_SECURE))
      : false,
    username: process.env.MAIL_USERNAME || 'MAIL_USERNAME',
    password: process.env.MAIL_PASSWORD || 'MAIL_PASSWORD',
    defaultFrom: process.env.MAIL_DEFAULT_FROM || 'app@test.com',
  },
});

export { getConfig };
