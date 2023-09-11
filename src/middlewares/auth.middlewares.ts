import authServices from '../auth/auth.services';
import { Request, Response, NextFunction } from 'express';

export async function authMiddleware (req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers['authorization'];

      if (token !== undefined) {
        const userData = await authServices.decodeJWT(token);

        // right JWT 
        if (userData !== null) {
          // current JWT
          if (await authServices.testJWT(userData.id, token)) {
            // the user is authenticated
            next();
          } else {
            res.status(403).json({
              status: 'bad',
              message: 'Your session has end'
            });
          }
        } else {
          res.status(403).json({
            status: 'bad',
            message: 'Your token is invalid'
          });
        }

      } else {
        res.status(403).json({
          status: 'bad',
          message: 'You are not authenticated'
        });
      }
    } catch (error) {
      next(error);
    }
  }
