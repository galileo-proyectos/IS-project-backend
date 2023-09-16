import { Router } from 'express';
import PasswordServices from './password.services';
import PasswordConst from './password.const';
import DataError from '../utils/ClientError';

export default (): Router => {
  const router = Router();

  router.get('/:code', async (req, res, next) => {
    try {      
      if (await PasswordServices.validateRecoveryCode(req.params.code)) {
        res.render('password_recovery/form', {
          title: 'Recuperar contraseña',
          recoveryRoute: PasswordConst.RECOVERY_ROUTE,
          recoveryCode: req.params.code,
          styles: 'password_recovery/form'
        });
      } else {
        res.sendStatus(403);
      }
    } catch (error) {
      res.sendStatus(403);
    }
  });

  router.post('/:code', async (req, res, next) => {
    try {
      if (await PasswordServices.validateRecoveryCode(req.params.code)) {
        if (req.body.password === req.body.confirmPassword) {
          await PasswordServices.changePassword(req.params.code, req.body.password);

          // send to somewhere
          res.render('password_recovery/success', {
            title: 'Contraseña actualizada',
            styles: 'password_recovery/success'
          });
        } else {
          // send to somewhere
          throw new DataError('Las contraseñas no coinciden.');
        }
      } else {
        // send to somewhere
        throw new DataError('No tienes permitido cambiar al contrasña.');
      }
    } catch (error) {
      if (error instanceof DataError) {
        res.render('password_recovery/try_again', {
          title: 'Contraseña no Cumple Requisitos',
          styles: 'password_recovery/try_again',
          message: error.message,
          goBackRoute: `${PasswordConst.RECOVERY_ROUTE}/${req.params.code}`
        });
      } else {
        next(error);
      }
    }
  });

  // password recovery
  router.post('/send-email', async (req, res, next) => {
    try {
      const email = req.body.email;

      if (typeof email === 'string') {

        await PasswordServices.sendRecoveryPasswordEmail(email);
        res.json({ status: 'ok' });
      } else {
        res.status(400).json({
          status: 'bad',
          message: 'Please provide an email'
        })
      }
    } catch (error) {
      next(error);
    }
  });

  return router;
};
