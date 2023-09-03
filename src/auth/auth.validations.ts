import DataError from "../utils/DataError";
import Patters from "../utils/Patters";
import dao from "./auth.db";

class AuthValidations {
  async registerValidations (data: Create.User): Promise<boolean> {
    // valid correct email
    if (!Patters.EMAIL.test(data.email || "")) {
      throw new DataError('Invalid email.');
    }
    if(await dao.existsEmail(data.email)) {
      throw new DataError('Duplicated email.');
    }

    // valid correct password
    if (!Patters.PASSWORD.test(data.password || "")) {
      throw new DataError('Invalid password.');
    }

    // valid correct born date
    if (typeof data.bornDate !== 'number') {
      data.bornDate = null;
    }

    // valid correct phone
    if (typeof data.phone == 'string') {
      if (data.phone.length === 0) {
        throw new DataError('Invalid phone length.');
      }
    } else {
      data.phone = null;
    }

    // valid correct acceptPromotions
    if (typeof data.acceptPromotions !== 'boolean') {
      throw new DataError('Invalid acceptPromotions data type.');
    }

    // valid correct acceptTerms
    if (typeof data.acceptTerms === 'boolean') {
      if (!data.acceptTerms) {
        throw new DataError('Invalid acceptTerms.');
      }
    } else {
      throw new DataError('Invalid acceptTerms data type.');
    }

    return true;
  }
}

const validations = new AuthValidations();
export default validations;
