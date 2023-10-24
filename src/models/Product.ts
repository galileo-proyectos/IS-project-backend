import { db } from '../SequelizeConnection'
import { DataTypes, Model } from "sequelize"

export default class Product extends Model {
  declare code: string
  declare name: string
  declare description: string | null
  declare price: number
  declare stock: number
  declare imageURL: string
}

Product.init({
  code: { type: DataTypes.STRING, allowNull: false, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  price: { type: DataTypes.DECIMAL, allowNull: false },
  stock: { type: DataTypes.DECIMAL, allowNull: false },
  imageURL: { type: DataTypes.STRING, allowNull: false }
},
{
  sequelize: db,
  createdAt: false,
  updatedAt: false
})
