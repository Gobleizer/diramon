import * as readline from 'node:readline'
import { stdin as input, stdout as output } from 'node:process'
import { parseCommand } from './directoryController.js' // fix this js need
import { parseError } from './directoryError.js'

const rl = readline.createInterface({ input, output })

rl.on('line', (line) => { // is this really the best way?
  try {
    parseCommand(line)
  } catch (e) {
    parseError(e)
  }
})
