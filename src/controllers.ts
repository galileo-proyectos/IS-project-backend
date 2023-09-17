import type { Application, Request, Response, NextFunction } from 'express'
import DataError from './utils/ClientError'

import authRoutes from './auth/auth.routes'

import { authMiddleware } from './middlewares/auth.middlewares'
import passwordRoutes from './password_recovery/password.routes'
import ForbiddenError from './utils/ForbiddenError'

export default (app: Application): void => {
  // signin, signup, password recovery
  app.use('/api/v1/auth', authRoutes())

  // PUBLIC routes goes here
  app.use('/api/v1/password-recovery', passwordRoutes())

  // protecting routes
  app.use(authMiddleware)

  // PRIVATE routes goes here
  app.get('/api/v1', (req, res, next) => {
    res.sendStatus(200)
  })

  // error route
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(error)
    }

    if (error instanceof DataError) {
      return res.clientErrorResponse(error.message)
    } else if (error instanceof ForbiddenError) {
      return res.forbiddenResponse(error.message)
    } else if (error instanceof SyntaxError) {
      return res.clientErrorResponse('Wrong JSON structure');
    }

    return res.fatalErrorResponse()
  })
}
