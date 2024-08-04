import printDirectory from './directoryView.js'
import { CustomError } from './directoryError.js'

class Directory {
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

  hasChild (childName) {
    return this.children.has(childName)
  }

  returnChild (childName) {
    return this.children.get(childName)
  }
}

function verifyPath (currentDirectory, directoryList, index) {
  if (currentDirectory.hasChild(directoryList[index])) { //is folder valid?
    return verifyPath(currentDirectory.returnChild(directoryList[index]), directoryList, index + 1) //move to that folder
  } else {
    if (index === directoryList.length) { 
      return true
    } else {
      return false //this path is not valid 
    }
  }
}

function findDirectory (currentDirectory, directoryList, index) {
  if (index === directoryList.length) {
    return currentDirectory
  } else {
    return findDirectory(currentDirectory.returnChild(directoryList[index]), directoryList, index+1)
  }
}

export function createDirectory (directoryPath) {
  //directoryPath = 'root/' + directoryPath
  const fullPath = directoryPath.split('/')
  const directoryBasePath = fullPath.slice(0,-1)
  // verify path
  if (verifyPath(root, directoryBasePath, 0)) {
    const newDirectoryName = fullPath.at(-1)
    const baseDirectory = findDirectory(root, directoryBasePath, 0)
    baseDirectory.addChild(newDirectoryName)
  } else {
    throw new CustomError(`${directoryPath} is not a valid path`)
  }
}

export function deleteDirectory (directoryPath) {
  const fullPath = directoryPath.split('/')
  const directoryBasePath = fullPath.slice(0,-1)
  // verify path
  if (verifyPath(root, fullPath, 0)) {
    const directoryForRemoval = fullPath.at(-1)
    const baseDirectory = findDirectory(root, directoryBasePath, 0)
    baseDirectory.removeChild(directoryForRemoval)
  } else {
    throw new CustomError(`${directoryPath} is not a valid path`)
  }
}

export function moveDirectory (source, destination) {

}

export function listDirectories () {
  if (root.children.size > 0) {
    root.children.forEach((child) => printDirectory(child))
  }
}

const root = new Directory('root')
// handle errors
