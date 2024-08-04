export const INDENT_FORMAT = '  '

let output = null

export function setOutputStream (outputStream) {
  output = outputStream
}

export default function printDirectory (directory, currentIndent = '') {
  output.write(currentIndent + directory.name + '\n')
  if (directory.children.size > 0) {
    currentIndent = currentIndent + INDENT_FORMAT
    const childNamesSorted = directory.getChildrenNamesAlphabetically()
    childNamesSorted.forEach((childName) => {
      printDirectory(directory.getChildByName(childName), currentIndent)
    })
  }
}
