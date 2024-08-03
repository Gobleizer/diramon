import printDirectory from './directoryView.js'

export class Directory {
  constructor (name) {
    this.name = name
    this.children = new Map([])
  }

  addChild (childName) {
    const childDirectory = new Directory(childName)
    this.children.set(childName, childDirectory)
  }

  removeChild (childName) {
    this.children.delete(childName)
  }
}

export function createDirectory (name) {
  root.addChild(name)
}

export function listDirectories () {
  if (root.children.size > 0) {
    root.children.forEach((child) => printDirectory(child))
  }
}

const root = new Directory('root')
// handle errors
