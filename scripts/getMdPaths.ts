import fs from 'fs'
import path from 'path'

function getMdPaths(dir: string, fileList: string[]) {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      // Recursively search in the subdirectory
      getMdPaths(filePath, fileList)
    } else if (path.extname(file) === '.md') {
      // If it's a markdown file, add it to the list
      fileList.push(filePath)
    }
  })

  return fileList
}

export default getMdPaths
