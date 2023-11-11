import stripe from '../utils/Stripe'

export async function processCartPayWithStripe (): Promise<void> {
  // create payment method
  /* const paymentMethod = await stripe.paymentMethods.create({
    type: 'card',
    card: {
      token: 'tok_visa'
    }

  }) */

  await stripe.paymentIntents.create({
    amount: 1 * 100,
    currency: 'USD',
    confirm: true,
    payment_method: 'pm_card_visa'
  })
}
