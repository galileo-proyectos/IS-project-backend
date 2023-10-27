import { DataTypes, Model } from "sequelize"
import { db } from '../SequelizeConnection'
import Product from "./Product"

export default class Category extends Model {
  declare id: number
  declare name: string
  declare imageURL: string
}

Category.init({
  id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  imageURL: { type: DataTypes.STRING, allowNull: false }
},
{
  sequelize: db,
  createdAt: false,
  updatedAt: false,
  modelName: 'category'
})
