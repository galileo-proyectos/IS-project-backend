import { Router } from 'express'
import * as PromotionServices from './promotions.services'

export default (): Router => {
  const router = Router()

  router.get('/', async (req, res, next) => {
    try {
      res.successResponse({
        message: 'ok',
        results: await PromotionServices.readAvailable()
      })
    } catch (error) {
      next(error)
    }
  })  

  return router
}
