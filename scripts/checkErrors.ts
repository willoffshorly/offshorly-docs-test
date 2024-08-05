import { error } from 'console'
import { LintResults } from 'markdownlint'
import getMdPaths from './getMdPaths.js'
import lintContent from './lintContent.js'
import checkCodeSnippets from './checkCodeSnippetExist.js'

;(async function checkErrors() {
  const paths = getMdPaths('content', [])
  const pathMap: Record<string, boolean> = {}
  
  // Check for code snippets in each file
  for (const path of paths) {
    console.log(`Checking file: ${path}`)
    pathMap[path] = false
    try {
      checkCodeSnippets(path)
    } catch (err) {
      if (err instanceof Error) {
        throw error(`File ${path} doesn't have a code snippet: ${err.message}`)
      } else {
        throw error(`An unknown error occurred while checking ${path} for code snippets`)
      }
    }
  }

  const result = await lintContent(paths)

  const keys = paths
  const errors: LintResults = {}
  keys.forEach((key) => {
    if (result[key].length) errors[key] = result[key]
  })

  if (Object.keys(errors).length) {
    throw error('Found Errors!', JSON.stringify(errors, null, 2))
  }
})()