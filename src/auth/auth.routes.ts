import { Router } from 'express'
import * as AuthServices from './auth.services'

export default (): Router => {
  const router = Router()

  // register
  router.post('/signup', (req, res, next) => {
    const body = req.body as Create.User

    AuthServices.registerUser(body).then(() => {
      res.okResponse()
    }).catch(next)
  })

  // log-in
  router.post('/signin', (req, res, next) => {
    const body = req.body

    AuthServices.signin(body).then((jwt) => {
      res.successResponse({ results: jwt, message: null })
    }).catch(next)
  })

  return router
}
