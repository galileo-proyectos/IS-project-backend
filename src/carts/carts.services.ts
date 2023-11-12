import stripe from '../utils/Stripe'
import * as PromotionSVC from '../promotions/promotions.services'
import DataError from '../utils/ClientError';

import Stripe from 'stripe'

import * as AuthSVC from '../auth/auth.services'

export async function createIntent (user: Auth.JWTPayload, total: number): Promise<Stripe.PaymentIntent> {
  // create stripe intent
  const paymentIntent = await stripe.paymentIntents.create({
    customer: user.stripeUserId,
    amount: total * 100,
    currency: 'GTQ',
    automatic_payment_methods: { enabled: true, allow_redirects: 'never' },
    description: "Gracias por su compra en Supermercados La Torre!",
    receipt_email: user.email,
  });

  // store in db
  await AuthSVC.updatePaymentIntent(user.id, paymentIntent.id);

  return paymentIntent;
}

export async function calcDiscount (cart: Create.Cart): Promise<number> {
  return await PromotionSVC.calcDiscount(cart);
}
