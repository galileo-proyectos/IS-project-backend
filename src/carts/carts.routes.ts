import { Router } from 'express'
import * as CartServices from './carts.services'

export default (): Router => {
  const router = Router()

  router.post('/payment_intent', (req, res, next) => {
    CartServices.createIntent(req.user.id, req.body.total).then((results) => {
      res.successResponse({ message: 'ok', results })
    }).catch(next)
  })

  router.post('/complete_purchase', (req, res, next) => {
    CartServices.createPurcahse(req.body.cart, req.user, req.body.token).then(() => {
      res.successResponse({ message: 'Payment completed', results: null })
    }).catch(next)
  })

  router.post('/apply_promotions', (req, res, next) => {
    CartServices.applyPromotions(req.body).then((newCart) => {
      res.successResponse({ message: 'ok', results: newCart })
    }).catch(next)
  })

  return router
}
