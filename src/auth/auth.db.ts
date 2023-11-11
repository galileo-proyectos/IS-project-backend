import { query } from '../DBConnetion'

export async function create (data: Create.User, stripUserId: string): Promise<number> {
  const sql = 'INSERT INTO users SET ?'
  const { insertId } = await query(sql, {
    email: data.email,
    stripUserId,
    password: data.password,
    bornDate: data.bornDate !== null ? new Date(data.bornDate) : null,
    phone: data.phone,
    acceptPromotions: data.acceptPromotions,
    acceptTerms: data.acceptTerms
  }) as DB.OkPacket
  return insertId
}

export async function changePassword (userId: number, password: string): Promise<void> {
  const sql = `
    UPDATE users SET password='${password}'
    WHERE id=${userId}
    LIMIT 1
  `
  await query(sql)
}

/**
   * This method is used to verify all users' emails are unique.
   * @param email user's email
   * @returns true if the email is already used, false if not.
   */
export async function existsEmail (email: string): Promise<boolean> {
  const sql = `
    SELECT id
    FROM users
    WHERE email='${email}'
    LIMIT 1
  `
  const data = await query(sql) as DB.RowDataPacket[]
  return data.length !== 0
}

/**
   * This method is used to read hashed passwords from db
   * @param email user's email
   * @returns user's data
   */
export async function readPassword (email: string): Promise<Read.UserWithPassword | null> {
  const sql = `
    SELECT
      id,email,stripUserId,password
    FROM users
    WHERE email='${email}'
    LIMIT 1
  `
  const data = await query(sql) as Read.UserWithPassword[] // warn!: some fields are missing
  if (data.length > 0) {
    return data[0]
  } else {
    return null
  }
}

export async function readJWT (userId: number): Promise<string | null> {
  const sql = `
    SELECT currentJWT
    FROM users
    WHERE id=${userId}
    LIMIT 1
  `
  const data = await query(sql) as Array<{ currentJWT: string | null }>
  if (data.length > 0) {
    return data[0].currentJWT
  } else {
    return null
  }
}

export async function storeJWT (userId: number, jwt: string): Promise<void> {
  const sql = `UPDATE users SET ? WHERE id=${userId}`
  await query(sql, { currentJWT: jwt })
}
