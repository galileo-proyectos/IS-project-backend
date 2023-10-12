import { v4 as uuidv4, validate } from 'uuid'

import * as PasswordConst from './password.const'
import * as PasswordDAO from './password.db'
import * as EmailServices from '../email/email.services'
import * as AuthServices from '../auth/auth.services'
import ValidationError from '../utils/ValidationError'
import { isValidEmail } from '../auth/auth.validations'

export async function sendRecoveryPasswordEmail (email: string): Promise<void> {
  if (isValidEmail (email)) {
    const user = await PasswordDAO.readByEmail(email)
  
    if (user !== null) {
      const code = uuidv4()
      await PasswordDAO.storeRecoveryCode(user.id, code)
  
      const recoveryPageURL = `${PasswordConst.RECOVEY_PAGE}/${code}`
      const htmlBody = `
          <table cellspacing="0" cellpadding="0" border="0" align="center" width="600" style="border-collapse: collapse">
            <tr>
              <td align="center" bgcolor="#3498db" style="padding: 40px 0">
                <h1 style="color: #ffffff">Recuperación de Contraseña</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px 30px">
                <p>¡Hola!</p>
                <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Si no has realizado esta solicitud, puedes ignorar este mensaje.</p>
                <p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
                <p><a href="${recoveryPageURL}" style="background-color: #3498db color: #ffffff padding: 10px 20px text-decoration: none border-radius: 5px">Cambiar Contraseña</a></p>
                <p>Si el enlace de arriba no funciona, copia y pega la siguiente URL en tu navegador:</p>
                <p>${recoveryPageURL}</p>
                <p>Gracias,</p>
                <p>Tu equipo de soporte</p>
              </td>
            </tr>
            <tr>
              <td bgcolor="#f5f5f5" style="text-align: center padding: 20px 0">
                <p style="color: #333333">© 2023 Scan&Go. Todos los derechos reservados.</p>
              </td>
            </tr>
          </table>
      `
      await EmailServices.sendHTMLEmail('Recuperación de Contraseña | Scan&Go', user.email, htmlBody)
    }
  }
}

export async function validateRecoveryCode (code: string): Promise<boolean> {
  if (validate(code)) {
    return await PasswordDAO.existsRecoveyCode(code) !== null
  }
  return false
}

export async function changePassword (recoveryCode: string, password: string): Promise<void> {
  // read userId
  const userId = await PasswordDAO.existsRecoveyCode(recoveryCode)

  if (userId !== null) {
    // update password
    await AuthServices.changePassword(userId, password)

    // delete recovery code
    await PasswordDAO.deleteRecoveryCode(userId)
  } else {
    throw new ValidationError('user not found', 'userId')
  }
}
