import ClientError from '../utils/ClientError';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

import AuthValidations from './auth.validations';
import AuthDAO from './auth.db';

export default class AuthSVC {
  /**
   * 
   * @param data user's data
   */
  public static async registerUser (data: Create.User): Promise<number> {
    // validate data
    if (await AuthValidations.registerValidations(data)) {
      // store in db
      const userId = await AuthDAO.create(data);

      // save password
      await this.changePassword(userId, data.password);

      // store in stripe

      // update stripUserId

      return userId;
    }
    return 0;
  }

  public static async changePassword (userId: number, rawPassword: string) {
    if (AuthValidations.validPassword(rawPassword)) {
      // hash password
      const password = await bcrypt.hash(rawPassword, parseInt(process.env.SALT_ROUNDS!));
      await AuthDAO.changePassword(userId, password);
    }
  }

  /**
   * this method is used to generate a JWT for a user
   * @param login user's email and password
   * @returns a JWT for the session
   */
  public static async signin (login: Auth.LogIn): Promise<string> {
    // read stored password
    const userData = await AuthDAO.readPassword(login.email);

    // compare
    if (await bcrypt.compare(login.password || "", userData.password)) {
      // jwt
      const jwt = await this.generateJWT({
        id: userData.id,
        email: userData.email
      });

      // store jwt in db
      await AuthDAO.storeJWT(userData.id, jwt);

      return jwt;
    } else {
      throw new ClientError('Incorrect password');
    }
  }
  private static generateJWT (payload: Auth.JWTPayload): Promise<string> {
    return new Promise((res, rej) => {
      jwt.sign(payload, process.env.JWT_PRIVATE_KEY!,
        (err, encoded) => {
          if (err) rej(err);
          res(encoded!);
       });
    });
  }

  /**
   * This method is used to decoed a JWT a get the JWTPayload
   * @param token a jwt 
   * @returns user data
   */
  public static async decodeJWT (token: string): Promise<Auth.JWTPayload | null> {
    return new Promise((res, rej) => {
      jwt.verify(token, process.env.JWT_PRIVATE_KEY!, (err, decoded) => {
        if (err) res(null);
        res(decoded as Auth.JWTPayload);
      });
    });
  }

  /**
   * This method is used to compare a jwt with the jwt stored in db
   * @param userId user's id
   * @param token request's jwt
   * @returns 
   */
  public static async testJWT (userId: number, token: string): Promise<boolean> {
    const storedJWT = await AuthDAO.readJWT(userId);

    // the user has signed in
    if (storedJWT !== null) {
      // compare tokens
      return storedJWT === token;
    }

    return false;
  }
}
