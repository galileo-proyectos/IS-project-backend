import { Router } from 'express';
import svc from './auth.services';

export default (): Router => {
  const router = Router();

  // register
  router.post('/signup', async (req, res, next) => {
    try {
      const body = req.body as Create.User;
  
      // create user
      await svc.registerUser(body);

      res.sendStatus(201);
    } catch (error) {
      next(error);
    }
  });

  // log-in
  router.post('/signin', async (req, res, next) => {
    try {
      const body = req.body;

      const jwt = await svc.signin(body);

      res.json({ status: 'ok', jwt });
    } catch (error) {
      next(error);
    }
  });

  // password recovery
  router.post('/password-recovery', async (req, res, next) => {
    try {
      const email = req.body.email;

      if (typeof email === 'string') {
        await svc.sendRecoveryPasswordEmail(email);
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
