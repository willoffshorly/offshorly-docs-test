import getNonMdPaths from './getNonMdPaths.js'
;(async function checkFileExtensions() {
  const paths = getNonMdPaths('content', [])

  if (paths.length) {
    throw new Error(
      `Found files that are not Markdown: ${JSON.stringify(paths, null, 2)}`,
    )
  }
})()
