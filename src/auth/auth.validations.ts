import DataError from '../utils/ClientError'
import Patters from '../utils/Patters'
import * as AuthDAO from './auth.db'

export async function registerValidations (data: Create.User): Promise<boolean> {
  // valid correct email
  if (!Patters.EMAIL.test(data.email ?? '')) {
    throw new DataError('Por favor, verifique que su dirección de correo electrónico sea válida.')
  }
  if (await AuthDAO.existsEmail(data.email ?? '')) {
    throw new DataError('Esta dirección de correo electrónico ya está en uso.')
  }

  // valid correct password
  validPassword(data.password)

  // valid correct born date
  if (typeof data.bornDate === 'number') {
    if (!(data.bornDate > -63115200000 && data.bornDate < Date.now())) {
      throw new DataError('Asegúrese de proporcionar una fecha de nacimiento válida y precisa.')
    }
  } else {
    data.bornDate = null
  }

  // valid correct phone
  if (typeof data.phone !== 'string' || data.phone.trim().length === 0) {
    data.phone = null
  }

  // valid correct acceptPromotions
  if (typeof data.acceptPromotions !== 'boolean') {
    throw new DataError('Invalid acceptPromotions data type.')
  }

  // valid correct acceptTerms
  if (typeof data.acceptTerms === 'boolean') {
    if (!data.acceptTerms) {
      throw new DataError('Para continuar, es necesario que acepte los términos y condiciones.')
    }
  } else {
    throw new DataError('Invalid acceptTerms data type.')
  }

  return true
}

export function validPassword (rawPassword: string): boolean {
  if (!Patters.PASSWORD.test(rawPassword ?? '')) {
    throw new DataError('Su contraseña debe tener al menos 8 caracteres.')
  }
  return true
}

export function isValidEmail (email: string): boolean {
  if (!Patters.EMAIL.test(email ?? '')) {
    throw new DataError('Por favor, verifique que su email sea válido.')
  }

  return true;
}
