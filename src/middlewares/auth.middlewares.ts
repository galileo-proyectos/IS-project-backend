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
        /* AuthServices.isCurrentJWT(userData.id, token).then((isValid) => {
          if (isValid) {
            next()
          } else {
            throw new ForbiddenError('Tu sesión ha terminado')
          }
        }).catch(next) */
        next()
      } else {
        throw new ForbiddenError('Tu token es inválido')
      }
    }).catch(next)
  } else {
    res.status(403).json({
      status: 'bad',
      message: 'You are not authenticated'
    })
  }
}
