import { fileURLToPath } from 'url'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const appFilePath = path.join(__dirname, '../index.js')

describe('Test Directory commands', () => {
  let testProcess = null

  function createChildProcess () {
    return spawn('node', [appFilePath])
  }

  function prepareChildProcessForWrite (childProcess) {
    childProcess.stdin.setEncoding('utf-8')
  }

  function endChildProcess (childProcess) {
    childProcess.kill('SIGINT')
  }
  beforeEach(() => {
    testProcess = createChildProcess()
    prepareChildProcessForWrite(testProcess)
  })

  afterEach(() => {
    endChildProcess(testProcess)
  })

  it('create and list a single new directory', done => {
    testProcess.stdin.write('create test\n')
    testProcess.stdin.write('list\n')
    testProcess.stdout.on('data', data => {
      const output = data.toString().trim()
      expect(output).toBe('test')
      done()
    })
  }
  )
})
