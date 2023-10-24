import { DataTypes, Model } from "sequelize"
import { db } from "../SequelizeConnection"

export default class PromotionDetail extends Model {
  declare id: number
  declare productCode: string
  declare discountValue: number
}

PromotionDetail.init({
  id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  productCode: { type: DataTypes.STRING, allowNull: false },
  discountValue: { type: DataTypes.DECIMAL, allowNull: false }
},
{
  sequelize: db,
  createdAt: false,
  updatedAt: false
})
