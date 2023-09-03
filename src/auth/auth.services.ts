import dao from './auth.db';
import vals from './auth.validations';
import bcrypt from "bcrypt";

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
}

const svc = new AuthSVC();
export default svc;
