import { db } from '../SequelizeConnection'
import { DataTypes } from 'sequelize'

export const Product = db.define('products', {
  code: { type: DataTypes.STRING, allowNull: false, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  price: { type: DataTypes.DECIMAL, allowNull: false },
  stock: { type: DataTypes.DECIMAL, allowNull: false },
  imageURL: { type: DataTypes.STRING },
  brandId: { type: DataTypes.NUMBER, allowNull: false },
  aisleId: { type: DataTypes.NUMBER, allowNull: false }
},
{
  createdAt: false,
  updatedAt: false
})

export const Aisle = db.define('aisles', {
  id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  imageURL: { type: DataTypes.STRING, allowNull: false }
},
{
  createdAt: false,
  updatedAt: false
})

export const Promotion = db.define('promotions', {
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
  createdAt: false,
  updatedAt: false
})

export const PromotionDetail = db.define('', {
  id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  productCode: { type: DataTypes.STRING, allowNull: false },
  discountValue: { type: DataTypes.DECIMAL, allowNull: false }
},
{
  createdAt: false,
  updatedAt: false
})
