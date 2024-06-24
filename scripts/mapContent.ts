import getMdPaths from './getMdPaths.js'
import { generateGitHubMarkdownList, groupByCategories } from './helpers.js'

function mapContent() {
  const paths = getMdPaths('content', [])

  const separatedPaths = paths.map((path) => path.split('/').slice(1))
  const generatedMarkdownList = generateGitHubMarkdownList(
    groupByCategories(separatedPaths),
    'https://github.com/jasonoffshorlydev/offshorly-docs/tree/main/content',
  )
  const markdown = `### Table of Contents
${generatedMarkdownList}
  `

  return markdown
}

export default mapContent
