import { Router } from 'express';
import svc from './auth.services';

export default (): Router => {
  const router = Router();

  // create
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

  return router;
};
