import { Op } from 'sequelize'
import type { Model } from 'sequelize'
import PromotionsConst from './promotions.const'
import Promotion from '../models/Promotion'
import * as ProductSVC from '../products/products.services'

export async function readAvailable (): Promise<Model[]> {
  const today = new Date()
  return await Promotion.findAll({
    attributes: ['id', 'name', 'description', 'couponCode', 'imageURL'],
    where: {
      isActivated: PromotionsConst.PROMO_ACTIVATED,
      startDate: {
        [Op.lt]: today.toISOString()
      },
      endDate: {
        [Op.gt]: today.toISOString()
      }
    }
  })
}

export async function applyPromotionsToCart (cart: Create.Cart): Promise<Read.Cart> {
  const detailsWithPromotions: Read.CartDetail[] = []
  for (const detail of cart.details) {
    const product = await ProductSVC.readOne(detail.productCode);

    detailsWithPromotions.push({
      productCode: detail.productCode,
      quantity: detail.quantity,
      price: product.price * 0.90, // this is the promotion hehehe
      priceOld: product.price
    })
  }

  return { details: detailsWithPromotions };
}
