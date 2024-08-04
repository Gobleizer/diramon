import { createDirectory, listDirectories, deleteDirectory, moveDirectory } from './directoryModel.js'
import { InvalidCommandError, IncompatibleNumberOfArgumentsError } from './directoryError.js'

const commandRouter = {
  create: createDirectory,
  list: listDirectories,
  delete: deleteDirectory,
  move: moveDirectory
}

const argRequirement = {
  create: 1,
  list: 0,
  delete: 1,
  move: 2
}

export const VALID_COMMANDS = Object.keys(commandRouter)

export function parseCommand (command) {
  const words = findWords(command)
  let commandKey = words[0]
  const arg1 = words[1]
  const arg2 = words[2]
  commandKey = verifyCommand(commandKey)
  verifyNumberOfArguments(commandKey, words.slice(1))
  commandRouter[commandKey](arg1, arg2)
}

function findWords (line) {
  line = line.trim()
  let words = line.split(' ')
  words = words.filter((word) => word !== '')
  return words
}

export function verifyCommand (command) {
  command = command.toLowerCase()
  if (VALID_COMMANDS.includes(command)) {
    return command
  } else {
    throw new InvalidCommandError(`${command} is not a valid command`, `${command} is not a valid command`, command)
  }
}

function verifyNumberOfArguments (command, inputArgs) {
  if (inputArgs.length < argRequirement[command]) {
    throw new IncompatibleNumberOfArgumentsError(`Too few arguments for ${command} command`, `Too few arguments for ${command}`, command)
  }
  if (inputArgs.length > argRequirement[command]) {
    throw new IncompatibleNumberOfArgumentsError(`Too many arguments for ${command} command`, `Too many arguments for ${command}`, command)
  }
  if (inputArgs.length === argRequirement[command]) {
    return true
  }
}
