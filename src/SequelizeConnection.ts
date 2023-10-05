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
  pool: {
    max: parseInt(process.env.DB_CONNECTION_LIMIT),
    min: 1,
  }
}

if (process.env.NODE_ENV === 'production') {
  options.dialectOptions = {
    ssl: {
      ca: fs.readFileSync(path.join(__dirname, './ca-certificate.crt'))
    }
  }
}

export const db = new Sequelize(options)

// test connection
db.authenticate().then(() => {
  console.log('Sequelize Connected!')
}).catch((err) => {
  throw err
})
