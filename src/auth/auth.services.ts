import ClientError from '../utils/ClientError'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import * as AuthValidations from './auth.validations'
import * as AuthDAO from './auth.db'
import ValidationError from '../utils/ValidationError'

/**
 *
 * @param data user's data
 */
export async function registerUser (data: Create.User): Promise<number> {
  // validate data
  if (await AuthValidations.registerValidations(data)) {
    // store in db
    const userId = await AuthDAO.create(data)

    // save password
    await changePassword(userId, data.password)

    // store in stripe

    // update stripUserId

    return userId
  }
  return 0
}

export async function changePassword (userId: number, rawPassword: string): Promise<void> {
  if (AuthValidations.validPassword(rawPassword)) {
    // hash password
    const password = await bcrypt.hash(rawPassword, parseInt(process.env.SALT_ROUNDS))
    await AuthDAO.changePassword(userId, password)
  }
}

/**
   * this method is used to generate a JWT for a user
   * @param login user's email and password
   * @returns a JWT for the session
   */
export async function signin (login: Auth.LogIn): Promise<string> {
  // read stored password
  const userData = await AuthDAO.readPassword(login.email)

  // compare
  if (await bcrypt.compare(login.password ?? '', userData.password)) {
    // jwt
    const jwt = await generateJWT({
      id: userData.id,
      email: userData.email
    })

    // store jwt in db
    await AuthDAO.storeJWT(userData.id, jwt)

    return jwt
  } else {
    throw new ClientError('Incorrect password', 'password')
  }
}
async function generateJWT (payload: Auth.JWTPayload): Promise<string> {
  return await new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_PRIVATE_KEY,
      (err, encoded) => {
        if (err !== null) {
          reject(err)
        } else {
          if (encoded !== undefined) {
            resolve(encoded)
          } else {
            reject(new ValidationError('null jwt', 'encoded'))
          }
        }
      })
  })
}

/**
 * This method is used to decoed a JWT a get the JWTPayload
 * @param token a jwt
 * @returns user data
 */
export async function decodeJWT (token: string): Promise<Auth.JWTPayload | null> {
  return await new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
      if (err !== null) {
        resolve(null)
      } else {
        resolve(decoded as Auth.JWTPayload)
      }
    })
  })
}

/**
 * This method is used to compare a jwt with the jwt stored in db
 * @param userId user's id
 * @param token request's jwt
 * @returns
 */
export async function testJWT (userId: number, token: string): Promise<boolean> {
  const storedJWT = await AuthDAO.readJWT(userId)

  // the user has signed in
  if (storedJWT !== null) {
    // compare tokens
    return storedJWT === token
  }

  return false
}
