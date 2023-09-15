import DataError from "../utils/ClientError";
import Patters from "../utils/Patters";
import dao from "./auth.db";

class AuthValidations {
  async registerValidations (data: Create.User): Promise<boolean> {
    // valid correct email
    if (!Patters.EMAIL.test(data.email || "")) {
      throw new DataError('Por favor, verifique que su dirección de correo electrónico sea válida."');
    }
    if(await dao.existsEmail(data.email)) {
      throw new DataError('Esta dirección de correo electrónico ya está en uso.');
    }

    // valid correct password
    if (!Patters.PASSWORD.test(data.password || "")) {
      throw new DataError('Su contraseña debe tener un mínimo de 8 caracteres.');
    }

    // valid correct born date
    if (typeof data.bornDate === 'number') {
      if (!(data.bornDate > -63115200000 && data.bornDate < Date.now())) {
        throw new DataError('Asegúrese de proporcionar una fecha de nacimiento válida y precisa.');
      }
    } else {
      data.bornDate = null;
    }

    // valid correct phone
    if (typeof data.phone !== 'string' || data.phone.trim().length === 0) {
      data.phone = null; 
    }

    // valid correct acceptPromotions
    if (typeof data.acceptPromotions !== 'boolean') {
      throw new DataError('Invalid acceptPromotions data type.');
    }

    // valid correct acceptTerms
    if (typeof data.acceptTerms === 'boolean') {
      if (!data.acceptTerms) {
        throw new DataError('Para continuar, es necesario que acepte los términos y condiciones.');
      }
    } else {
      throw new DataError('Invalid acceptTerms data type.');
    }

    return true;
  }
}

const validations = new AuthValidations();
export default validations;
