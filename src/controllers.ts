import { Application, Request, Response, NextFunction } from "express";
import DataError from "./utils/DataError";

import authRoutes from "./auth/auth.routes";

export default (app: Application) => {
  // app.use(.....);
  app.use('/api/v1/auth/', authRoutes());

  // error route
  app.use((error: Error, req: Request, res: Response, next: NextFunction): void => {
    if (process.env.NODE_ENV === 'development') {
      console.log(error);
    }

    if (error instanceof DataError) {
      res.status(400).json({
        message: error.message
      });
    } else {
      res.sendStatus(500);
    }
  });
}
