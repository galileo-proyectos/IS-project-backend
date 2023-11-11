import { Op } from 'sequelize'
import type { Model } from 'sequelize'
import PromotionsConst from './promotions.const'
import Promotion from '../models/Promotion'

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
