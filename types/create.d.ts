export {}

declare global {
  namespace Create {
    interface User {
      email: string
      password: string
      bornDate: number?;
      phone: string?;
      acceptPromotions: boolean
      acceptTerms: boolean
    }

    interface Cart {
      details: CartDetail[]
    }
    interface CartDetail {
      productCode: string
      quantity: number
    }
  }
}
