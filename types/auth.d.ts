export {}

declare global {
  namespace Auth {
    interface LogIn {
      email: string
      password: string
    }

    interface JWTPayload {
      id: number
      stripeUserId: string
      email: string
    }
  }
}
