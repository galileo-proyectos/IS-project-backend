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

  return router;
};
