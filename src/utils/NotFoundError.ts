export default class NotFoundError extends Error {
  toString (): string {
    return `[NotFoundError]: ${this.message}`
  }
}
