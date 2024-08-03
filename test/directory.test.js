import { fileURLToPath} from 'url'
import path from 'node:path'
import { spawn } from 'node:child_process'
import {describe, it, expect} from '@jest/globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const appFilePath = path.join(__dirname, '../src/index.js')

describe('Test Directory commands', () => {
  it('create and list a single new directory', done => {
    const testProcess = spawn('node', [appFilePath])

    testProcess.stdin.setEncoding('utf-8')
    testProcess.stdin.write('create test\n')
    testProcess.stdin.write('list\n')
    testProcess.stdout.on('data', data => {
      const output = data.toString().trim()
      expect(output).toBe('test')
      testProcess.kill('SIGINT')
      done()
    })
  }
  )
})
