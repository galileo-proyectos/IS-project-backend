import { DataTypes, Model } from "sequelize"
import { db } from '../SequelizeConnection'

export default class Promotion extends Model {
  declare id: number
  declare name: string
  declare description: string
  declare couponCode: string
  declare startDate: Date
  declare endDate: Date
  declare imageURL: string
  declare isActivated: boolean
}

Promotion.init({
  id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  couponCode: { type: DataTypes.STRING, allowNull: false },
  startDate: { type: DataTypes.TIME, allowNull: false },
  endDate: { type: DataTypes.TIME, allowNull: false },
  imageURL: { type: DataTypes.STRING, allowNull: false },
  isActivated: { type: DataTypes.TINYINT, allowNull: false }
},
{
  sequelize: db,
  createdAt: false,
  updatedAt: false
})
