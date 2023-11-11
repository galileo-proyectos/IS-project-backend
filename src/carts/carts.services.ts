import stripe from '../utils/Stripe'
import * as PromotionSVC from '../promotions/promotions.services'
import DataError from '../utils/ClientError';

export async function createPurcahse (cart: Create.Cart, user: Auth.JWTPayload, cardID: string): Promise<void> {
  // apply promotions
  const cartWithPromotions = await PromotionSVC.applyPromotionsToCart(cart);

  // calc total
  let total = 0;
  cartWithPromotions.details.forEach((detail) => {
    total += detail.quantity * detail.price;
  })

  if (total >= 25) {
    // consume supermarket webservice
    // ...
  
    // process payment
    await processCartPayWithStripe(total, user, cardID);
  } else {
    throw new DataError('El pago por medio de la aplicación solo está disponible para compras mayores a Q25.00')
  }
}

export async function applyPromotions (cart: Create.Cart): Promise<Read.Cart> {
  return await PromotionSVC.applyPromotionsToCart(cart);
}

export async function processCartPayWithStripe (total: number, user: Auth.JWTPayload, cardID: string): Promise<void> {
  // create payment method
  await stripe.paymentIntents.create({
    customer: user.stripeUserId,
    amount: total * 100,
    currency: 'GTQ',
    confirm: true,
    payment_method: cardID,
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: 'never'
    },
    description: "Gracias por su compra en Supermercados La Torre!",
    receipt_email: user.email,
  })
}
