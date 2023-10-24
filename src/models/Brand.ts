import { db } from '../SequelizeConnection'
import { DataTypes, Model } from "sequelize"
import Product from './Product'

export default class Brand extends Model {
  declare id: number
  declare name: string
  // declare imageURL: string
}

Brand.init({
  id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true }
  // imageURL: { type: DataTypes.STRING, allowNull: false }
},
{
  sequelize: db,
  createdAt: false,
  updatedAt: false
})
// association config
Brand.hasMany(Product, {
  foreignKey: 'brandId'
})
Product.belongsTo(Brand)
