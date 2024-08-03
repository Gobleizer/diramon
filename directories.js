import * as readline from 'node:readline'
import { stdin as input, stdout as output } from 'node:process'
import { createDirectory, listDirectories } from './directoryModel.js'

const validCommands = {
  create: createDirectory,
  list: listDirectories
}

const rl = readline.createInterface({ input, output })

rl.on('line', (line) => {
  parseCommand(line)
})

function parseCommand (command) {
  const words = command.split(' ')
  const commandKey = words[0]
  const dirArgs = words.slice(1)
  validCommands[commandKey](...dirArgs)
}
