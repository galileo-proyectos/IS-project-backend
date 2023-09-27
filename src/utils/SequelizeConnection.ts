import { Sequelize } from 'sequelize'

// verify all important info in passed
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

export const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  pool: {
    max: 10
  }
})

// test connection
db.authenticate().then(() => {
  console.log('Sequelize Connected!')
}).catch((err) => {
  throw err
})
