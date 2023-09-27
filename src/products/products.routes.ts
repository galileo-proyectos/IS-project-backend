import { Router } from 'express'
import * as ProductServices from './products.services'

export default (): Router => {
  const router = Router()

  router.get('/', (req, res, next) => {
    // allowed queries
    let brandId: number | null = null
    if (typeof req.query.brandId === 'string' && req.query.brandId.trim().length !== 0) {
      brandId = parseInt(req.query.brandId)
    }

    let aisleId: number | null = null
    if (typeof req.query.aisleId === 'string' && req.query.aisleId.trim().length !== 0) {
      aisleId = parseInt(req.query.aisleId)
    }

    let fromPrice: number | null = null
    if (typeof req.query.fromPrice === 'string' && req.query.fromPrice.trim().length !== 0) {
      fromPrice = parseInt(req.query.fromPrice)
    }

    let toPrice: number | null = null
    if (typeof req.query.toPrice === 'string' && req.query.toPrice.trim().length !== 0) {
      toPrice = parseInt(req.query.toPrice)
    }

    ProductServices.readAll({ brandId, aisleId, fromPrice, toPrice }).then((results) => {
      res.successResponse({
        message: 'ok',
        results
      })
    }).catch(next)
  })

  return router
}
