import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const myEnv = dotenvExpand(dotenv.config({ path: '../../.env' })).parsed;
process.env = Object.assign(process.env, myEnv);

export interface Config {
  http: {
    port: number;
  };
  database: {
    url: string;
    entitiesPath: string[];
  };
  cache: {
    url: string;
  };
  logging: {
    level: string;
    json: boolean;
  };
  jwtSecret: string;
}

const isDevMode = process.env.NODE_ENV !== 'production';

const config: Config = {
  http: {
    port: +(process.env.PORT || 3000),
  },
  database: {
    url:
      process.env.DATABASE_URL || 'postgres://user:pass@localhost:5432/apidb',
    entitiesPath: [
      ...(isDevMode
        ? ['src/database/entity/**/!(*.test.ts)']
        : ['dist/database/entity/**/*.!(*.test.js)']),
    ],
  },
  cache: {
    url: process.env.CACHE_URL || 'redis://localhost:6379',
  },
  logging: {
    level: isDevMode ? 'debug' : 'info',
    json: !isDevMode,
  },
  jwtSecret: process.env.JWT_SECRET || 'your-secret-whatever',
};

export { config };
