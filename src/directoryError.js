export class CustomError extends Error {
  constructor (message, cause) {
    super(message)
    this.cause = cause
    this.name = 'customError'
  }
}

export function parseError (e) {
  if (e instanceof CustomError) {
    console.error('Error encounterd, ', e)
  } else {
    // graceful shutdown
    throw e
  }
}
