import { Router } from 'express';
import AuthServices from './auth.services';

export default (): Router => {
  const router = Router();

  // register
  router.post('/signup', async (req, res, next) => {
    try {
      const body = req.body as Create.User;
  
      // create user
      await AuthServices.registerUser(body);

      res.status(200).json({
        status: 200,
        message: 'ok',
        result: null,
        results: null,
      });
    } catch (error) {
      next(error);
    }
  });

  // log-in
  router.post('/signin', async (req, res, next) => {
    try {
      const body = req.body;

      const jwt = await AuthServices.signin(body);

      res.json({ status: 'ok', jwt });
    } catch (error) {
      next(error);
    }
  });

  return router;
};
