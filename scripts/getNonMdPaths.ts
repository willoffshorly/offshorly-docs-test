import fs from 'fs'
import path from 'path'

function getNonMdPaths(dir: string, fileList: string[]) {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      // Recursively search in the subdirectory
      getNonMdPaths(filePath, fileList)
    } else if (path.extname(file) !== '.md') {
      // If it's not a markdown file, add it to the list
      fileList.push(filePath)
    }
  })

  return fileList
}

export default getNonMdPaths
