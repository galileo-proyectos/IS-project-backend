import type { Application, Request, Response, NextFunction } from 'express'
import DataError from './utils/ClientError'

import ForbiddenError from './utils/ForbiddenError'
import NotFoundError from './utils/NotFoundError'

import { authMiddleware } from './middlewares/auth.middlewares'

import authRoutes from './auth/auth.routes'
import productsRoutes from './products/products.routes'
import passwordRoutes from './password_recovery/password.routes'
import promotionsRoutes from './promotions/promotions.routes'
import categoriesRoutes from './categories/categories.routes'

export default (app: Application): void => {
  // signin, signup, password recovery
  app.use('/api/v1/auth', authRoutes())

  // PUBLIC routes goes here
  app.use('/api/v1/password-recovery', passwordRoutes())

  // protecting routes...
  app.use(authMiddleware)

  // PRIVATE routes goes here
  app.use('/api/v1/products', productsRoutes())
  app.use('/api/v1/categories', categoriesRoutes())
  app.use('/api/v1/promotions', promotionsRoutes())

  // error route
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(error)
    }

    if (error instanceof DataError) {
      return res.clientErrorResponse(error.message)
    } else if (error instanceof NotFoundError) {
      return res.notFoundErrorRespose(error.message)
    } else if (error instanceof ForbiddenError) {
      return res.forbiddenResponse(error.message)
    } else if (error instanceof SyntaxError) {
      return res.clientErrorResponse('Wrong JSON structure');
    }

    return res.fatalErrorResponse()
  })
}
