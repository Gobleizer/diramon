export default class Directory {
  constructor (name) {
    this.name = name
    this.children = new Map([])
    this.isChildrenSorted = true
  }

  addChild (child) {
    this.children.set(child.name, child)
    if (this.children.size > 1) {
      this.isChildrenSorted = false
    }
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

  sortChildren () {
    this.children = new Map([...this.children].sort(([a], [b]) => String(a).localeCompare(b)))
    this.isChildrenSorted = true
  }

  getChildrenNamesAlphabetically () {
    if (!this.isChildrenSorted) {
      this.sortChildren()
    }
    return this.children.keys().toArray()
  }
}
