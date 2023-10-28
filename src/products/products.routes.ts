import { Router } from 'express'
import * as ProductServices from './products.services'

export default (): Router => {
  const router = Router()

  router.get('/', (req, res, next) => {
    // allowed queries
    let name: string | null = null
    if (typeof req.query.name === 'string' && req.query.name.trim().length > 2) {
      name = req.query.name
    }

    let categoryIds: number[] | null = null
    if (typeof req.query.categoryIds === 'string' && req.query.categoryIds.trim().length !== 0) {
      categoryIds = req.query.categoryIds.split(',').map((id) => parseInt(id))
    }
    
    let brandId: number | null = null
    if (typeof req.query.brandId === 'string' && req.query.brandId.trim().length !== 0) {
      brandId = parseInt(req.query.brandId)
    }

    let fromPrice: number | null = null
    if (typeof req.query.fromPrice === 'string' && req.query.fromPrice.trim().length !== 0) {
      fromPrice = parseInt(req.query.fromPrice)
    }

    let toPrice: number | null = null
    if (typeof req.query.toPrice === 'string' && req.query.toPrice.trim().length !== 0) {
      toPrice = parseInt(req.query.toPrice)
    }

    ProductServices.readAll({ name, categoryIds, brandId, fromPrice, toPrice }).then((results) => {
      res.successResponse({
        message: 'ok',
        results
      })
    }).catch(next)
  })

  router.get('/:code/code', (req, res, next) => {
    ProductServices.readOne(req.params.code).then((results) => {
      res.successResponse({
        message: 'ok',
        results
      })
    }).catch(next)
  })

  return router
}
