import { NextFunction, Request, RequestHandler, Response } from 'express'
import { HttpRequest, Middleware } from '../../presentation/protocols'

export const adaptMiddleware = (middleware: Middleware): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      headers: req.headers
    }
    const httpResponse = await middleware.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body)
      return next()
    } else {
      return res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}