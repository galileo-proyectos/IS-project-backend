export {}

declare global {
  namespace Express {
    interface ResponseBody {
      message: string | null
      results: any | null
    }

    interface Response {
      successResponse: (body: ResponseBody) => void,
      fatalErrorResponse: () => void,
      forbiddenResponse: (message: string) => void,
      clientErrorResponse: (message: string) => void,
      okResponse: () => void
    }
  }
}