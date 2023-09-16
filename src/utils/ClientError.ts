export default class DataError extends Error {
  field: string

  constructor (message: string, field: string) {
    super(message)
    this.field = field
  }

  toString (): string {
    return `[DataError]: Error in field '${this.field}'. ${this.message}`
  }
}
