import { Router } from 'express'
import * as AuthServices from './auth.services'

export default (): Router => {
  const router = Router()

  // register
  router.post('/signup', (req, res, next) => {
    const body = req.body as Create.User

    AuthServices.registerUser(body).then(() => {
      res.status(200).json({
        status: 200,
        message: 'ok',
        result: null,
        results: null
      })
    }).catch(next)
  })

  // log-in
  router.post('/signin', (req, res, next) => {
    const body = req.body

    AuthServices.signin(body).then((jwt) => {
      res.json({ status: 'ok', jwt })
    }).catch(next)
  })

  return router
}
