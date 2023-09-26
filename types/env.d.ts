export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_PORT: number;
      SALT_ROUNDS: string;
      JWT_PRIVATE_KEY: string;
    }
  }
}