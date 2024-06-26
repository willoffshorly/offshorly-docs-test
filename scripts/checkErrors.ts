import { error } from 'console'
import { LintResults } from 'markdownlint'
import getMdPaths from './getMdPaths.js'
import lintContent from './lintContent.js'
;(async function checkErrors() {
  const paths = getMdPaths('content', [])
  const pathMap: Record<string, boolean> = {}
  paths.forEach((path) => {
    pathMap[path] = false
  })

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
