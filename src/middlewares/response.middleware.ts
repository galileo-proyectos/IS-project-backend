import type { Request, Response, NextFunction } from 'express'

export function injectResponseTypes (req: Request, res: Response, next: NextFunction): void {
  res.okResponse = function () {
    res.status(200).json({
      status: 200,
      message: 'ok',
      results: null
    })
  }

  res.successResponse = function (response: Express.ResponseBody) {
    res.status(200).json({
      status: 200,
      ...response
    })
  }

  res.fatalErrorResponse = function () {
    res.status(200).json({
      status: 500,
      message: 'internal server error',
      results: null
    })
  }

  res.forbiddenResponse = function (message: string) {
    res.status(200).json({
      status: 403,
      message,
      results: null
    })
  }

  res.clientErrorResponse = function (message: string) {
    res.status(200).json({
      status: 400,
      message,
      results: null
    })
  }

  next()
}
