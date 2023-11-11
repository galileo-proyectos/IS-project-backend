import * as AuthServices from '../auth/auth.services'
import type { Request, Response, NextFunction } from 'express'
import ForbiddenError from '../utils/ForbiddenError'

export function authMiddleware (req: Request, res: Response, next: NextFunction): void {
  const token = req.headers.authorization

  if (token !== undefined) {
    AuthServices.decodeJWT(token).then((userData) => {
      // right JWT
      if (userData !== null) {
        // current JWT
        req.user = userData;
        next()
      } else {
        throw new ForbiddenError('Tu token es inválido')
      }
    }).catch(next)
  } else {
    throw new ForbiddenError('You are not authenticated')
  }
}
