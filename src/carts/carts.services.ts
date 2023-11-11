import stripe from '../utils/Stripe'
import * as ProductSVC from '../products/products.services'

export async function createPurcahse (cart: Create.Cart, stripUserId: string, cardID: string): Promise<void> {
  // apply promotions
  const cartWithPromotions = await applyPromotionsToDetails(cart);

  // calc total
  let total = 0;
  cartWithPromotions.details.forEach((detail) => {
    total += detail.quantity * detail.price;
  })

  // consume supermarket webservice
  // ...

  // process payment
  await processCartPayWithStripe(total, stripUserId, cardID);
}

export async function applyPromotionsToDetails (cart: Create.Cart): Promise<Read.Cart> {
  // logic to apply promotions goes here
  const detailsWithPromotions: Read.CartDetail[] = []
  for (const detail of cart.details) {
    const product = await ProductSVC.readOne(detail.productCode);

    detailsWithPromotions.push({
      productCode: detail.productCode,
      quantity: detail.quantity,
      price: product.price * 0.5, // this is the promotion hehehe
      priceOld: detail.price
    })
  }

  return { details: detailsWithPromotions };
}

export async function processCartPayWithStripe (total: number, stripeUserId: string, cardID: string): Promise<void> {
  // create payment method
  await stripe.paymentIntents.create({
    customer: stripeUserId,
    amount: total * 100,
    currency: 'GTQ',
    confirm: true,
    payment_method: cardID,
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: 'never'
    },
  })
}
