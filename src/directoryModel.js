import printDirectory from './directoryView.js'
import { CustomError } from './directoryError.js'

class Directory {
  constructor (name) {
    this.name = name
    this.children = new Map([])
  }

  addChild (child) {
    this.children.set(child.name, child)
  }

  deleteChild (child) {
    this.children.delete(child.childName)
  }

  deleteChildByName (childName) {
    this.children.delete(childName)
  }

  hasChildByName (childName) {
    return this.children.has(childName)
  }

  getChildByName (childName) {
    return this.children.get(childName)
  }
}

function verifyPath (currentDirectory, directoryList, index = 0) {
  if (currentDirectory.hasChildByName(directoryList[index])) { // is folder valid?
    return verifyPath(currentDirectory.getChildByName(directoryList[index]), directoryList, index + 1) // move to that folder
  } else {
    if (index === directoryList.length) {
      return true
    } else {
      return false // this path is not valid
    }
  }
}

function findDirectory (currentDirectory, directoryList, index = 0) {
  if (index === directoryList.length) {
    return currentDirectory
  } else {
    return findDirectory(currentDirectory.getChildByName(directoryList[index]), directoryList, index + 1)
  }
}

export function createDirectory (directoryPath) {
  // directoryPath = 'root/' + directoryPath
  const fullPath = directoryPath.split('/')
  const directoryBasePath = fullPath.slice(0, -1)
  // verify path
  if (verifyPath(root, directoryBasePath)) {
    const newDirectoryName = fullPath.at(-1)
    const baseDirectory = findDirectory(root, directoryBasePath)
    const newDirectory = new Directory(newDirectoryName)
    baseDirectory.addChild(newDirectory)
  } else {
    throw new CustomError(`${directoryPath} is not a valid path`)
  }
}

export function deleteDirectory (directoryPath) {
  const fullPath = directoryPath.split('/')
  const directoryBasePath = fullPath.slice(0, -1)
  // verify path
  if (verifyPath(root, fullPath, 0)) {
    const directoryForRemoval = fullPath.at(-1)
    const baseDirectory = findDirectory(root, directoryBasePath)
    baseDirectory.deleteChildByName(directoryForRemoval)
  } else {
    throw new CustomError(`${directoryPath} is not a valid path`)
  }
}

export function moveDirectory (source, destination) {
  const sourcePath = source.split('/')
  const sourceDirectoryBasePath = sourcePath.slice(0, -1)
  const destinationPath = destination.split('/')
  if (verifyPath(root, sourcePath) && verifyPath(root, destinationPath)) {
    const directoryToMoveName = sourcePath.at(-1)
    const sourceBaseDirectory = findDirectory(root, sourceDirectoryBasePath)
    const directoryToMove = sourceBaseDirectory.getChildByName(directoryToMoveName)
    sourceBaseDirectory.deleteChildByName(directoryToMoveName)
    const destinationDirectory = findDirectory(root, destinationPath)
    destinationDirectory.addChild(directoryToMove)
  } else {
    throw new CustomError('This move is Invalid')
  }
}

export function listDirectories () {
  if (root.children.size > 0) {
    root.children.forEach((child) => printDirectory(child))
  }
}

const root = new Directory('root')
// handle errors
