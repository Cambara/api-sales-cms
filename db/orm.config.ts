import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  database: process.env.DB_DATABASE || 'api-sales-cms',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  name: 'default',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations_typeorm',
  migrationsRun: true,
  synchronize: false,
  type: 'mysql',
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  logging: !!process.env.DB_DISPLAY_LOGGING,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
