import * as AuthServices from '../auth/auth.services'
import type { Request, Response, NextFunction } from 'express'

export function authMiddleware (req: Request, res: Response, next: NextFunction): void {
  const token = req.headers.authorization

  if (token !== undefined) {
    AuthServices.decodeJWT(token).then((userData) => {
      // right JWT
      if (userData !== null) {
        // current JWT
        AuthServices.testJWT(userData.id, token).then((isValid) => {
          if (isValid) {
            next()
          } else {
            res.status(403).json({
              status: 'bad',
              message: 'Your session has end'
            })
          }
        }).catch(next)
      } else {
        res.status(403).json({
          status: 'bad',
          message: 'Your token is invalid'
        })
      }
    }).catch(next)
  } else {
    res.status(403).json({
      status: 'bad',
      message: 'You are not authenticated'
    })
  }
}
