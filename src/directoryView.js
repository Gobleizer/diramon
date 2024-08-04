const indentFormat = '  '

export default function printDirectory (directory, currentIndent = '') {
  console.log(currentIndent + directory.name)
  if (directory.children.size > 0) {
    currentIndent = currentIndent + indentFormat
    directory.children.forEach((child) => {
      printDirectory(child, currentIndent)
    })
  }
}