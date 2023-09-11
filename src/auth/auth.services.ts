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
