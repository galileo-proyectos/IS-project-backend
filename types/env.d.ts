export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SALT_ROUNDS: string;
      JWT_PRIVATE_KEY: string;

      NODE_ENV: 'production' | 'development'
      
      DB_HOST: string;
      DB_PORT: number;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      DB_CONNECTION_LIMIT: string;
    }
  }
}