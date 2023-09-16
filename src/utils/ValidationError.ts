export default class ValidationError extends Error {
  field: string

  constructor (message: string, field: string) {
    super(message)
    this.field = field
  }

  toString (): string {
    return `[ValidationError]: Error in field '${this.field}'. ${this.message}`
  }
}
