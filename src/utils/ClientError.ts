export default class DataError extends Error {
  toString (): string {
    return `[DataError]: ${this.message}`
  }
}
