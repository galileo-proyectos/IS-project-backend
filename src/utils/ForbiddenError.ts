export default class ForbiddenError extends Error {
  constructor (message: string = 'Debes iniciar sesión para acceder a este servicio') {
    super(message)
  }
}
