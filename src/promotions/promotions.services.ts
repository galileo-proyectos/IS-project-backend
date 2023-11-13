import { Op } from 'sequelize'
import type { Model } from 'sequelize'
import PromotionsConst from './promotions.const'
import Promotion from '../models/Promotion'
import { query } from '../DBConnetion'

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

export async function calcDiscount (cart: Create.Cart): Promise<number> {  
  let discount = 0;

  for (const detail of cart.details) {
    let sql = `
      SELECT MAX(D.discountValue) AS value FROM promotion_details D
      INNER JOIN promotions P ON D.promotionId = P.id
      WHERE
        D.productCode=${detail.productCode}
        AND
        P.isActivated=${PromotionsConst.PROMO_ACTIVATED}
        AND
        P.startDate < NOW()
        AND
        P.endDate > NOW()
    `;
    const discountValues = await query(sql) as { value: number}[];
    if (discountValues.length !== 0) {
      discount += discountValues[0].value * detail.price * detail.quantity;
    }
  }
  
  return discount;
}
