import { fileURLToPath } from 'url'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'
import { INDENT_FORMAT } from '../directoryView'
import { EXAMPLE_INPUT, EXAMPLE_OUTPUT } from './example'

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
      const output = data.toString()
      expect(output).toBe('test\n')
      done()
    })
  }
  )

  it('create and list directories 2 deep', done => {
    let collectedOutput = ''
    testProcess.stdin.write('create test\n')
    testProcess.stdin.write('create test/food\n')
    testProcess.stdin.write('list\n')
    testProcess.stdout.on('data', data => {
      collectedOutput = collectedOutput + data.toString()
    })
    testProcess.stdin.end()
    testProcess.stdout.on('end', data => {
      expect(collectedOutput).toBe('test\n' + INDENT_FORMAT + 'food\n')
      done()
    })
  }
  )

  it('create, delete, and list directories 2 deep', done => {
    let collectedOutput = ''
    testProcess.stdin.write('create test\n')
    testProcess.stdin.write('create test/food\n')
    testProcess.stdin.write('delete test/food\n')
    testProcess.stdin.write('list\n')
    testProcess.stdout.on('data', data => {
      collectedOutput = collectedOutput + data.toString()
    })
    testProcess.stdin.end()
    testProcess.stdout.on('end', data => {
      expect(collectedOutput).toBe('test\n')
      done()
    })
  }
  )

  it('create, move, and list directories 2 deep', done => {
    let collectedOutput = ''
    testProcess.stdin.write('create test\n')
    testProcess.stdin.write('create test/dog\n')
    testProcess.stdin.write('create under\n')
    testProcess.stdin.write('move test/dog under\n')
    testProcess.stdin.write('list\n')
    testProcess.stdout.on('data', data => {
      collectedOutput = collectedOutput + data.toString()
    })
    testProcess.stdin.end()
    testProcess.stdout.on('end', data => {
      expect(collectedOutput).toBe('test\n' + 'under\n' + INDENT_FORMAT + 'dog\n')
      done()
    })
  }
  )

  it('should pass requested example', done => {
    let collectedOutput = ''
    testProcess.stdin.write(EXAMPLE_INPUT)
    testProcess.stdout.on('data', data => {
      collectedOutput = collectedOutput + data.toString()
    })
    testProcess.stdin.end()
    testProcess.stdout.on('end', data => {
      expect(collectedOutput).toBe(EXAMPLE_OUTPUT)
      done()
    })
  })
})
