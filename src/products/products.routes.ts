import { Router } from "express"
import * as ProductServices from './products.services'

export default (): Router => {
  const router = Router()

  router.get('/', async (req, res, next) => {
    try {
      res.successResponse({
        message: 'ok',
        results: await ProductServices.readAll(),
      })
    } catch (error) {
      next(error)
    }
  })

  return router
}
