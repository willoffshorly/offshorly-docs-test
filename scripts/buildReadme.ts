import fs from 'fs/promises'
import mapContent from './mapContent.js'
;(async function buildReadme() {
  let readme = await fs.readFile('READMEBASE.md', { encoding: 'utf-8' })
  const tableOfContents = mapContent()
  readme += `\n${tableOfContents}`

  await fs.writeFile('README.md', readme)
})()
