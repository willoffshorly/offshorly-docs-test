import chalk from 'chalk'
import { generateVSCodeLink, hasAnyArrayWithValues } from './helpers.js'
import lintContent from './lintContent.js'

async function lintMdFiles(path: string) {
  const result = await lintContent([path])
  const keys = Object.keys(result)
  const values = Object.values(result)

  if (!hasAnyArrayWithValues(values)) return true

  for (let i = 0; i < keys.length; i++) {
    const value = values[i]
    if (value.length) {
      console.log(
        chalk.red(`Found ${value.length} errors in file!
            please check the file and fix any errors: ${generateVSCodeLink(path)}`),
      )
      console.log('Errors: ', JSON.stringify(value, null, 2))
      return false
    }
  }

  return true
}

export default lintMdFiles
