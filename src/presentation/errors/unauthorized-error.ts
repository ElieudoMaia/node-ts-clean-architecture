export class UnauthorizedError extends Error {
  constructor (stack?: string) {
    super('UnauthorizedError')
    this.name = 'UnauthorizedError'
    this.stack = stack
  }
}
