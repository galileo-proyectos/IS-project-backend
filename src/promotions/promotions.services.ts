import { Promotion } from "../models/Models";
import { Op } from "sequelize";
import PromotionsConst from "./promotions.const";

export async function readAvailable () {
  const today = new Date();
  return await Promotion.findAll({
    attributes: ['id', 'name', 'description', 'couponCode', 'imageURL'],
    where: {
      isActivated: PromotionsConst.PROMO_ACTIVATED,
      startDate: {
        [Op.lt] : today.toISOString()
      },
      endDate: {
        [Op.gt] : today.toISOString()
      }
    }
  })
}