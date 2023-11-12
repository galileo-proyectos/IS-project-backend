import { Router } from 'express'
import * as CartServices from './carts.services'

export default (): Router => {
  const router = Router()

  router.post('/payment_intent', (req, res, next) => {
    CartServices.createIntent(req.user, req.body.total).then((results) => {
      res.successResponse({ message: 'ok', results })
    }).catch(next)
  })

  router.post('/calc_discount', (req, res, next) => {
    CartServices.calcDiscount(req.body).then((discount) => {
      res.successResponse({ message: 'ok', results: discount })
    }).catch(next)
  })

  return router
}
