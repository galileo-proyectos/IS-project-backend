import fs from 'fs'
import path from 'path'
import { Options, Sequelize } from 'sequelize'

const options: Options = {
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: process.env.NODE_ENV === 'production',
  dialect: 'mysql',
  dialectOptions: {
    decimalNumbers: true,
    ssl: process.env.NODE_ENV === 'production' ? {
      ca: fs.readFileSync(path.join(__dirname, './ca-certificate.crt'))
    } : undefined
  },
  pool: {
    max: parseInt(process.env.DB_CONNECTION_LIMIT),
    min: 1
  }
}

export const db = new Sequelize(options)

// test connection
db.authenticate().then(() => {
  console.log('Sequelize Connected!')
}).catch((err) => {
  throw err
})
