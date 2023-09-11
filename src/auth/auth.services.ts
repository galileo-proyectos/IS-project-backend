import dao from './auth.db';
import vals from './auth.validations';
import bcrypt from "bcrypt";
import ClientError from '../utils/ClientError';
import jwt from 'jsonwebtoken';



class AuthSVC {
  /**
   * 
   * @param data user's data
   */
  public async registerUser (data: Create.User): Promise<number> {
    // validate data
    if (await vals.registerValidations(data)) {
      // hash password
      data.password = await bcrypt.hash(data.password, parseInt(process.env.SALT_ROUNDS!));

      // store in db
      const userId = await dao.create(data);

      // store in stripe

      // update stripUserId

      return userId;
    }
    return 0;
  }

  /**
   * this method is used to generate a JWT for a user
   * @param login user's email and password
   * @returns a JWT for the session
   */
  public async signin (login: Auth.LogIn): Promise<string> {
    // read stored password
    const userData = await dao.readByEmail(login.email);

    // compare
    if (await bcrypt.compare(login.password || "", userData.password)) {
      // jwt
      const jwt = await this.generateJWT({
        id: userData.id,
        email: userData.email
      });

      // store jwt in db
      await dao.storeJWT(userData.id, jwt);

      return jwt;
    } else {
      throw new ClientError('Incorrect password');
    }
  }

  public async decodeJWT (token: string): Promise<Auth.JWTPayload | null> {
    return new Promise((res, rej) => {
      jwt.verify(token, process.env.JWT_PRIVATE_KEY!, (err, decoded) => {
        if (err) res(null);
        res(decoded as Auth.JWTPayload);
      });
    });
  }

  public async testJWT (userId: number, token: string): Promise<boolean> {
    const storedJWT = await dao.readJWT(userId);

    // the user has signed in
    if (storedJWT !== null) {
      // compare tokens
      return storedJWT === token;
    }

    return false;
  }

  private generateJWT (payload: Auth.JWTPayload): Promise<string> {
    return new Promise((res, rej) => {
      jwt.sign(payload, process.env.JWT_PRIVATE_KEY!,
        (err, encoded) => {
          if (err) rej(err);
          res(encoded!);
       });
    });
  }
}

const svc = new AuthSVC();
export default svc;
