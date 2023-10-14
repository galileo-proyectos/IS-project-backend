import { Router } from 'express'
import * as AisleServices from './categories.services'

export default (): Router => {
  const router = Router()

  router.get('/', (req, res, next) => {
    AisleServices.readAll().then((results) => {
      res.successResponse({
        message: 'ok',
        results
      })
    }).catch(next)
  })

  router.get('/:id/id', (req, res, next) => {
    AisleServices.readOne(parseInt(req.params.id)).then((results) => {
      res.successResponse({
        message: 'ok',
        results
      })
    }).catch(next)
  })

  return router
}
