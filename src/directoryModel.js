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
    if ((index + 1) === directoryList.length) { 
      // is this last node? (to be created) //also if the nodes matched i.e. already existed then this will be last+1 and fail
      //should probable have a better error 
      return true
    } else {
      return false //this path is not valid 
    }
  }
}

function findDirectory (currentDirectory, directoryList, index) {
  if (index + 1 === directoryList.length) {
    return currentDirectory
  } else {
    return findDirectory(currentDirectory.returnChild(directoryList[index]), directoryList, index+1)
  }
}

export function createDirectory (directoryPath) {
  //directoryPath = 'root/' + directoryPath
  const directoryNodes = directoryPath.split('/')
  // verify path
  if (verifyPath(root, directoryNodes, 0)) {
    const newDirectoryName = directoryNodes.at(-1)
    const baseDirectory = findDirectory(root, directoryNodes, 0)
    baseDirectory.addChild(newDirectoryName)
  } else {
    throw new CustomError(`${directoryPath} is not a valid path`)
  }
}

export function deleteDirectory (name) {

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
