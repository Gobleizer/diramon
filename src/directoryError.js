let userErrorStream = null

export class CustomError extends Error {
  constructor (message, cause, currentCommand) {
    super(message)
    this.cause = cause
    this.currentCommand = currentCommand
  }
}

export class InvalidPathError extends CustomError {
  constructor (message, cause, currentCommand, invalidDirectory, attemptedFullPath) {
    super(message, cause, currentCommand)
    this.invalidDirectory = invalidDirectory
    this.attemptedFullPath = attemptedFullPath
  }
}

export function setUserErrorStream (stream) {
  userErrorStream = stream
}
export function parseError (e) {
  if (e instanceof InvalidPathError) {
    e.message = `Cannot ${e.currentCommand} ${e.attemptedFullPath} - ${e.invalidDirectory} does not exist\n`
  }
  if (e instanceof CustomError) {
    console.error('Error encountered, ', e)
    userErrorStream.write(e.message)
  } else {
    throw e
  }
}
