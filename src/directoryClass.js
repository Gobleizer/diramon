export default class Directory {
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
