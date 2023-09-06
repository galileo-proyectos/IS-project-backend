export {};

declare global {
  namespace Read {
    interface User {
      id: number;
      email: string;
      bornDate: number?;
      phone: string?;
      imageURL: string?;
    }
    interface UserWithPassword extends User{
      password: string;
    }
  }
}