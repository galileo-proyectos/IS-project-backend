import { Application, Request, Response, NextFunction } from "express";
import DataError from "./utils/ClientError";

import authRoutes from "./auth/auth.routes";

import { authMiddleware } from './middlewares/auth.middlewares';

export default (app: Application) => {
  // signin, signup, password recovery
  app.use('/api/v1/auth/', authRoutes());

  // PUBLIC routes goes here

  // protecting routes
  app.use(authMiddleware);

  // PRIVATE routes goes here
  app.get('/api/v1/', (req, res, next) => {
    res.sendStatus(200);
  });

  // error route
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(error);
    }

    if (error instanceof DataError) {
      return res.status(400).json({
        status: 400,
        message: error.message,
        results: null,
        result: null,
      });
    } else if (error instanceof SyntaxError) { 
      return res.status(400).json({
        status: 400,
        message: 'Wrong JSON structure',
        results: null,
        result: null,
      });
    }

    res.status(500).json({
      status: 'fail',
      message: error.message
    });
  });
}
