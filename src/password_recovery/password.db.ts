import { query } from '../DBConnetion'

export async function readByEmail (email: string): Promise<Read.User | null> {
  const sql = `
    SELECT
      id,email,bornDate,phone,imageURL
    FROM users
    WHERE email='${email}'
    LIMIT 1
  `
  const data = await query(sql) as Read.UserWithPassword[] // warn!: some fields are missing
  if (data.length > 0) {
    return data[0]
  }
  return null
}

export async function storeRecoveryCode (userId: number, code: string): Promise<void> {
  const sql = `
    INSERT INTO user_recovery_codes
    SET userId=${userId}, recoveryCode='${code}'
  `
  await query(sql)
}

export async function existsRecoveyCode (code: string): Promise<number | null> {
  const sql = `
    SELECT userId FROM user_recovery_codes
    WHERE recoveryCode='${code}'
    LIMIT 1
  `
  const dbData = await query(sql) as Array<{ userId: number }>
  if (dbData.length !== 0) {
    return dbData[0].userId
  }
  return null
}

export async function deleteRecoveryCode (userId: number): Promise<void> {
  const sql = `
    DELETE FROM user_recovery_codes
    WHERE userId=${userId}
  `
  await query(sql)
}
