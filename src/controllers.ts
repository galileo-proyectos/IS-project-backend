import { Application, Request, Response, NextFunction } from "express";
import DataError from "./utils/ClientError";

import authRoutes from "./auth/auth.routes";

export default (app: Application) => {
  // app.use(.....);
  app.use('/api/v1/auth/', authRoutes());

  // error route
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(error);
    }

    if (error instanceof DataError) {
      return res.status(400).json({
        message: error.message
      });
    } else if (error instanceof SyntaxError) { 
      return res.status(400).json({ message: 'Wrong JSON structure' });
    }

    res.status(500).json({
      status: 'fail',
      message: error.message
    });
  });
}
