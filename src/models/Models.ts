import { db } from '../SequelizeConnection'
import { DataTypes } from 'sequelize'

// ========= Product =========
export const Product = db.define('products', {
  code: { type: DataTypes.STRING, allowNull: false, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  price: { type: DataTypes.DECIMAL, allowNull: false },
  stock: { type: DataTypes.DECIMAL, allowNull: false },
  imageURL: { type: DataTypes.STRING }
},
{
  createdAt: false,
  updatedAt: false
})

// ========= Category =========
export const Category = db.define('categories', {
  id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  imageURL: { type: DataTypes.STRING, allowNull: false }
},
{
  createdAt: false,
  updatedAt: false
})
// association config
Category.hasMany(Product, {
  foreignKey: 'categoryId'
});
Product.belongsTo(Category);

// ========= Brand =========
export const Brand = db.define('brands', {
  id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true }
  // imageURL: { type: DataTypes.STRING, allowNull: false }
},
{
  createdAt: false,
  updatedAt: false
})
// association config
Brand.hasMany(Product, {
  foreignKey: 'brandId'
});
Product.belongsTo(Brand);

// ========= Brand =========
export const Aisle = db.define('aisles', {
  id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true }
},
{
  createdAt: false,
  updatedAt: false
})
// association config
Aisle.hasMany(Product, {
  foreignKey: 'aisleId'
});
Product.belongsTo(Aisle);

// ========= Promotion =========
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

// ========= PromotionDetail =========
export const PromotionDetail = db.define('', {
  id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  productCode: { type: DataTypes.STRING, allowNull: false },
  discountValue: { type: DataTypes.DECIMAL, allowNull: false }
},
{
  createdAt: false,
  updatedAt: false
})
