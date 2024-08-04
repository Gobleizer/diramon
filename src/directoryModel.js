import printDirectory from './directoryView.js'
import { InvalidPathError } from './directoryError.js'

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

  getChildrenNamesAlphabetically () {
    return this.children.keys().toArray().sort()
  }
}

function verifyPath (currentDirectory, directoryList, index = 0) {
  if (currentDirectory.hasChildByName(directoryList[index])) {
    return verifyPath(currentDirectory.getChildByName(directoryList[index]), directoryList, index + 1)
  } else {
    if (index === directoryList.length) {
      return true
    } else {
      throw new InvalidPathError(`${currentDirectory.name} is not a valid directory`, `${currentDirectory.name} is not a valid directory`, 'unknown', directoryList[index], directoryList.join('/'))
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
  const fullPath = directoryPath.split('/')
  const directoryBasePath = fullPath.slice(0, -1)
  try {
    verifyPath(root, directoryBasePath)
    const newDirectoryName = fullPath.at(-1)
    const baseDirectory = findDirectory(root, directoryBasePath)
    const newDirectory = new Directory(newDirectoryName)
    baseDirectory.addChild(newDirectory)
  } catch (e) {
    if (e instanceof InvalidPathError) {
      e.attemptedFullPath = directoryPath
      e.currentCommand = 'create'
      throw e
    } else {
      throw e
    }
  }
}

export function deleteDirectory (directoryPath) {
  const fullPath = directoryPath.split('/')
  const directoryBasePath = fullPath.slice(0, -1)
  try {
    verifyPath(root, fullPath, 0)
    const directoryForRemoval = fullPath.at(-1)
    const baseDirectory = findDirectory(root, directoryBasePath)
    baseDirectory.deleteChildByName(directoryForRemoval)
  } catch (e) {
    if (e instanceof InvalidPathError) {
      e.attemptedFullPath = directoryPath
      e.currentCommand = 'delete'
      throw e
    } else {
      throw e
    }
  }
}

export function moveDirectory (source, destination) {
  const sourcePath = source.split('/')
  const sourceDirectoryBasePath = sourcePath.slice(0, -1)
  const destinationPath = destination.split('/')
  try {
    verifyPath(root, sourcePath)
    verifyPath(root, destinationPath)
    const directoryToMoveName = sourcePath.at(-1)
    const sourceBaseDirectory = findDirectory(root, sourceDirectoryBasePath)
    const directoryToMove = sourceBaseDirectory.getChildByName(directoryToMoveName)
    sourceBaseDirectory.deleteChildByName(directoryToMoveName)
    const destinationDirectory = findDirectory(root, destinationPath)
    destinationDirectory.addChild(directoryToMove)
  } catch (e) {
    if (e instanceof InvalidPathError) {
      e.currentCommand = 'move'
      throw e
    } else {
      throw e
    }
  }
}

export function listDirectories () {
  root.getChildrenNamesAlphabetically().forEach((childName) => printDirectory(root.getChildByName(childName)))
}

const root = new Directory('root')
