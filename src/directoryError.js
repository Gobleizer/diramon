import { VALID_COMMANDS } from './directoryController.js'

let userErrorStream = null

export class CustomError extends Error {
  constructor (message, cause, currentCommand) {
    super(message)
    this.cause = cause
    this.currentCommand = currentCommand
  }
}

export class InvalidCommandError extends CustomError {

}

export class IncompatibleNumberOfArgumentsError extends CustomError {

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
    e.message = `Cannot ${e.currentCommand} ${e.attemptedFullPath} - ${e.invalidDirectory} does not exist`
  }
  if (e instanceof InvalidCommandError) {
    e.message = `'${e.currentCommand}' is not a valid command. Only the following are valid commands:\n  ${VALID_COMMANDS.join('\n  ')}`
  }
  if (e instanceof IncompatibleNumberOfArgumentsError) {
    e.message = e.message + '\nRefer to README for command examples.'
  }
  if (e instanceof CustomError) {
    console.error('Error encountered, ', e)
    userErrorStream.write(e.message + '\n')
  } else {
    throw e
  }
}
