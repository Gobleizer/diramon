import { createDirectory, listDirectories, deleteDirectory } from './directoryModel.js'
import { CustomError } from './directoryError.js'

const commandRouter = {
  create: createDirectory,
  list: listDirectories,
  delete: deleteDirectory
}

const validCommands = Object.keys(commandRouter)

export function parseCommand (command) {
  const words = findWords(command)
  let commandKey = words[0]
  const arg1 = words[1]
  const arg2 = words[2]
  commandKey = verifyCommand(commandKey)
  commandRouter[commandKey](arg1, arg2)
}

function findWords (line) {
  line = line.trim()
  let words = line.split(' ')
  words = words.filter((word) => word !== '')
  return words
}

function verifyCommand (command) {
  command = command.toLowerCase()
  if (validCommands.includes(command)) {
    return command
  } else {
    throw new CustomError(`${command} is not a valid command`)
  }
}
