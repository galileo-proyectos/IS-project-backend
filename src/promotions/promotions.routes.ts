import { Router } from 'express'
import * as PromotionServices from './promotions.services'

export default (): Router => {
  const router = Router()

  router.get('/', (req, res, next) => {
    PromotionServices.readAvailable().then((results) => {
      res.successResponse({
        message: 'ok',
        results
      })
    }).catch(next)
  })

  return router
}
