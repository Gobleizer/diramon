import * as readline from 'node:readline'
import { stdin as input, stdout as output } from 'node:process'

const rl = readline.createInterface({ input, output })

rl.on('line', (line) => {
  console.log('Echo: ', line)
})
