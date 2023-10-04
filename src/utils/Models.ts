import { db } from './SequelizeConnection'
import { DataTypes } from 'sequelize'

export const Product = db.define('products', {
  code: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.NUMBER, allowNull: false },
  stock: { type: DataTypes.NUMBER, allowNull: false },
  imageURL: { type: DataTypes.STRING },
  brandId: { type: DataTypes.NUMBER, allowNull: false },
  aisleId: { type: DataTypes.NUMBER, allowNull: false }
},
{
  createdAt: false,
  updatedAt: false
})

export const Aisle = db.define('aisles', {
  id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  imageURL: { type: DataTypes.STRING }
},
{
  createdAt: false,
  updatedAt: false
})
