import * as readline from 'node:readline'
import { stdin as input, stdout as output } from 'node:process'
import { parseCommand } from './directoryController.js' // fix this js need
import { parseError } from './directoryError.js'
import { setOutputStream } from './directoryView.js'

const rl = readline.createInterface({ input, output })

setOutputStream(output)

rl.on('line', (line) => { // is this really the best way?
  try {
    parseCommand(line)
  } catch (e) {
    parseError(e)
  }
})
