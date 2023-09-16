export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SALT_ROUNDS: string;
      JWT_PRIVATE_KEY: string;
    }
  }
}