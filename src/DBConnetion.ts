import fs from 'fs'
import path from 'path'
import mysql from 'mysql2'
import type { Pool } from 'mysql2'

// validations
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

const connectionOptions: mysql.PoolOptions = {
  connectionLimit: 5,
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  decimalNumbers: true,
}

if (process.env.NODE_ENV === 'production') {
  connectionOptions.ssl = {
    ca: fs.readFileSync(path.join(__dirname, './ca-certificate.crt'))
  }
}

const pool: Pool = mysql.createPool(connectionOptions)

export async function query (sql: string, data: any = null): Promise<DB.QueryResult> {
  return await new Promise<DB.QueryResult>((resolve, reject) => {
    if (data !== null) {
      pool.query(sql, data, (err, result: DB.QueryResult) => {
        if (err === null) {
          resolve(result)
        } else {
          if (process.env.NODE_ENV === 'development') {
            console.error(`[ERROR]: ${sql}`)
          }
          reject(err)
        }
      })
    } else {
      pool.query(sql, (err, result: DB.QueryResult) => {
        if (err === null) {
          resolve(result)
        } else {
          if (process.env.NODE_ENV === 'development') {
            console.error(`[ERROR]: ${sql}`)
          }
          reject(err)
        }
      })
    }
  })
}
