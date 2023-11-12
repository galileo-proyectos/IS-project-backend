export {}

declare global {
  namespace Read {
    interface User {
      id: number
      email: string
      stripUserId: string;
      paymentIntent: string;
      bornDate: number?;
      phone: string?;
      imageURL: string?
    }
    interface UserWithPassword extends User {
      password: string
    }

    interface Brand {
      id: number;
      name: string;
      imageURL: string?;
    }
    interface Aisle {
      id: number;
      name: string;
      imageURL: string?;
    }
    interface Product {
      code: string;
      name: string;
      description: string?;
      price: number;
      stock: number;
      imageURL: string?;
      brandId: number;
      brand: Brand?;
      aisleId: number;
      aisle: Aisle?;
    }

    interface Cart {
      details: CartDetail[]
    }
    interface CartDetail {
      productCode: string;
      quantity: number;
      price: number;
      priceOld: number;
    }
  }
}