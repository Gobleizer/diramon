export default function printDirectory (directory) {
  console.log(directory.name)
  if (directory.children.size > 0) {
    console.log('  ')
    directory.children.forEach((child) => {
      printDirectory(child)
    })
  }
}
