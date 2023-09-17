import { Router } from 'express'
import * as PasswordServices from './password.services'
import * as PasswordConst from './password.const'
import DataError from '../utils/ClientError'
import ForbiddenError from '../utils/ForbiddenError'

export default (): Router => {
  const router = Router()

  router.get('/:code', (req, res, next) => {
    PasswordServices.validateRecoveryCode(req.params.code).then((isValid) => {
      if (isValid) {
        res.render('password_recovery/form', {
          title: 'Recuperar contraseña',
          recoveryRoute: PasswordConst.RECOVERY_ROUTE,
          recoveryCode: req.params.code,
          styles: 'password_recovery/form'
        })
      } else {
        throw new ForbiddenError()
      }
    }).catch(() => {
      next(new ForbiddenError())
    })
  })

  // password recovery
  router.post('/send-email', (req, res, next) => {
    const email = req.body.email

    if (typeof email === 'string' && email.trim().length !== 0) {
      PasswordServices.sendRecoveryPasswordEmail(email).then(() => {
        res.okResponse()
      }).catch(next)
    } else {
      next(new DataError('Debes escribir una dirección de correo para continuar', 'email'))
    }
  })

  router.post('/:code', (req, res, next) => {
    PasswordServices.validateRecoveryCode(req.params.code).then((isValid) => {
      if (isValid) {
        if (req.body.password === req.body.confirmPassword) {
          PasswordServices.changePassword(req.params.code, req.body.password).then(() => {
            // send to somewhere
            res.render('password_recovery/success', {
              title: 'Contraseña actualizada',
              styles: 'password_recovery/success'
            })
          }).catch((reason) => {
            if (reason instanceof DataError) {
              res.render('password_recovery/try_again', {
                title: 'Contraseña no Cumple Requisitos',
                styles: 'password_recovery/try_again',
                message: reason.message,
                goBackRoute: `${PasswordConst.RECOVERY_ROUTE}/${req.params.code}`
              })
            } else {
              next(reason)
            }
          })
        } else {
          // send to somewhere
          next(new DataError('Las contraseñas no coinciden.', 'confirmPassword'))
        }
      } else {
        // send to somewhere
        next(new DataError('No tienes permitido cambiar al contraseña.', 'recoveryCode'))
      }
    }).catch((reason) => {
      next(reason)
    })
  })

  return router
}
