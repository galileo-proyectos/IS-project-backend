import { Router } from 'express'
import * as CartServices from './carts.services'

export default (): Router => {
  const router = Router()

  router.post('/complete_purchase', (req, res, next) => {
    CartServices.createPurcahse(req.body.cart, req.user.stripeUserId, req.body.token).then(() => {
      res.successResponse({ message: 'Payment completed', results: null })
    }).catch(next)
  })

  return router
}
