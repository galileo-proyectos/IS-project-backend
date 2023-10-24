import { db } from '../SequelizeConnection'
import { DataTypes, Model } from "sequelize"
import Product from './Product'

export default class Aisle extends Model {
  declare id: number
  declare name: string
}

Aisle.init({
  id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true }
},
{
  sequelize: db,
  createdAt: false,
  updatedAt: false
})
// association config
Aisle.hasMany(Product, {
  foreignKey: 'aisleId'
})
Product.belongsTo(Aisle)
