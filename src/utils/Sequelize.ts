import { DataTypes, Sequelize } from 'sequelize'

if (process.env.DB_USERNAME === undefined) {
  throw new Error('No username for database provided')
}

if (process.env.DB_PASSWORD === undefined) {
  throw new Error('No password for database provided')
}

if (process.env.DB_HOST === undefined) {
  throw new Error('No host for database provided')
}

if (process.env.DB_NAME === undefined) {
  throw new Error('No name for database provided')
}

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  pool: {
    max: 10,
  },
})

export const Product = db.define('products', {
  code: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.NUMBER, allowNull: false },
  stock: { type: DataTypes.NUMBER, allowNull: false },
  imageURL: { type: DataTypes.STRING },
  brandId: { type: DataTypes.NUMBER, allowNull: false },
  aisleId: { type: DataTypes.NUMBER, allowNull: false },
},
{
  createdAt:false,
  updatedAt: false
})

// test connection
db.authenticate().then((value) => {
  console.log('Sequelize Connected!')
}).catch((err) => {
  throw err
})