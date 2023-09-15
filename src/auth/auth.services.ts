import ClientError from '../utils/ClientError';
import vals from './auth.validations';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import dao from './auth.db';
import bcrypt from "bcrypt";

import emailServices from '../email/email.services'


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
    const userData = await dao.readPassword(login.email);

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

  /**
   * This method is used to decoed a JWT a get the JWTPayload
   * @param token a jwt 
   * @returns user data
   */
  public async decodeJWT (token: string): Promise<Auth.JWTPayload | null> {
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
  public async testJWT (userId: number, token: string): Promise<boolean> {
    const storedJWT = await dao.readJWT(userId);

    // the user has signed in
    if (storedJWT !== null) {
      // compare tokens
      return storedJWT === token;
    }

    return false;
  }

  public async sendRecoveryPasswordEmail (email: string) {
    const user = await dao.readByEmail(email);

    if (user !== null) {
      const code = uuidv4();
      await dao.storeRecoveryCode(user.id, code);

      const recoveryPageURL = `${process.env.HOST}:${process.env.PORT}/passwor-recovery/${code}`;
      const htmlBody = `
          <table cellspacing="0" cellpadding="0" border="0" align="center" width="600" style="border-collapse: collapse;">
              <tr>
                  <td align="center" bgcolor="#3498db" style="padding: 40px 0;">
                      <h1 style="color: #ffffff;">Recuperación de Contraseña</h1>
                  </td>
              </tr>
              <tr>
                  <td style="padding: 20px 30px;">
                      <p>¡Hola!</p>
                      <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Si no has realizado esta solicitud, puedes ignorar este mensaje.</p>
                      <p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
                      <p><a href="${recoveryPageURL}" style="background-color: #3498db; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Cambiar Contraseña</a></p>
                      <p>Si el enlace de arriba no funciona, copia y pega la siguiente URL en tu navegador:</p>
                      <p>${recoveryPageURL}</p>
                      <p>Gracias,</p>
                      <p>Tu equipo de soporte</p>
                  </td>
              </tr>
              <tr>
                  <td bgcolor="#f5f5f5" style="text-align: center; padding: 20px 0;">
                      <p style="color: #333333;">© 2023 Scan&Go. Todos los derechos reservados.</p>
                  </td>
              </tr>
          </table>
      `;
      await emailServices.sendHTMLEmail('Recuperación de Contraseña | Scan&Go', user.email, htmlBody);
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
