import { exec } from 'child_process'
import path from 'path'
import { promisify } from 'util'

function hasAnyArrayWithValues<T>(arrayOfArrays: T[][]) {
  return arrayOfArrays.some((innerArray) => innerArray.length > 0)
}
function generateVSCodeLink(filePath: string) {
  const absolutePath = path.resolve(filePath)
  const encodedPath = absolutePath
  return `"vscode://${encodedPath}"`
}

const execAsync = promisify(exec)

async function installVsCodeExtension(extensions: string[]) {
  try {
    for (const extension of extensions) {
      const { stdout, stderr } = await execAsync(
        `code --install-extension ${extension}`,
      )
      console.log(`Successfully installed ${extension}:`, stdout)
    }
  } catch (error) {
    console.error('Error during installation:', error)
  }
}

interface GroupedData {
  [category: string]: GroupedData | string[]
}

function groupByCategories(data: string[][]): GroupedData {
  return data.reduce((acc: GroupedData, item: string[]) => {
    const lastElement = item.pop() as string // Remove and get the last element (the actual item)
    let currentLevel = acc

    // Traverse through all elements except the last one (which is now removed)
    item.forEach((category) => {
      // Check if the category already exists, otherwise create a new object
      if (!currentLevel[category]) {
        currentLevel[category] = {}
      }
      // Move to the next level
      currentLevel = currentLevel[category] as GroupedData
    })

    // Add the actual item to the lowest level
    if (!currentLevel['_items']) {
      currentLevel['_items'] = []
    }
    ;(currentLevel['_items'] as string[]).push(lastElement)

    return acc
  }, {})
}

function generateGitHubMarkdownList(
  obj: GroupedData,
  pathPrefix: string = '',
): string {
  let markdown = ''

  Object.keys(obj).forEach((key, i, arr) => {
    if (key === '_items') {
      // If key is '_items', format items as markdown list with GitHub-compatible links
      markdown += (obj[key] as string[])
        .map((item) => {
          const itemPath = `${pathPrefix}/${item}`
          return `\n- [${item}](${new URL(itemPath).toString()})`
        })
        .join('\n')
    } else {
      if (markdown.lastIndexOf('\n') > 0) {
        markdown += '\n\n'
      } else markdown += '\n'
      // Otherwise, format as category header and recursively generate list
      markdown += `#### ${key}\n`
      markdown += generateGitHubMarkdownList(
        obj[key] as GroupedData,
        `${pathPrefix}/${key}`,
      )
    }
  })

  return markdown
}

export {
  generateGitHubMarkdownList,
  generateVSCodeLink,
  groupByCategories,
  hasAnyArrayWithValues,
  installVsCodeExtension,
}
