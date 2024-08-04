import * as readline from 'node:readline'
import { stdin as input, stdout as output } from 'node:process'
import { parseCommand } from './directoryController.js' // fix this js need
import { parseError, setUserErrorStream } from './directoryError.js'
import * as list from './directoryView.js'

const rl = readline.createInterface({ input, output })

list.setOutputStream(output)
setUserErrorStream(output)

rl.on('line', (line) => { // is this really the best way?
  try {
    parseCommand(line)
  } catch (e) {
    parseError(e)
  }
})
