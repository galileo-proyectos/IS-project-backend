import { Application, Request, Response, NextFunction } from "express";
import DataError from "./utils/DataError";

export default (app: Application) => {
  // app.use(.....);

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
