import chalk from 'chalk'
import chokidar from 'chokidar'
import figlet from 'figlet'
import { readFile, writeFile } from 'fs/promises'
import getMdPaths from './scripts/getMdPaths.js'
import { installVsCodeExtension } from './scripts/helpers.js'
import lintMdFiles from './scripts/lint.js'
import mapContent from './scripts/mapContent.js'
;(async () => {
  const argvs = process.argv
  const enableReadmeOverwrite =
    argvs.includes('--enableOverwrite') || argvs.includes('-e')
  //Install VSCode extensions
  await new Promise<void>((resolve) => {
    setTimeout(async () => {
      console.log(chalk.yellow('Installing VSCode Extensions...'))
      await installVsCodeExtension([
        'DavidAnson.vscode-markdownlint',
        'esbenp.prettier-vscode',
      ])
      resolve()
    }, 1500)
  })

  //Map markdown files path
  const paths = getMdPaths('content', [])
  const pathMap: Record<string, boolean> = {}
  paths.forEach((path) => {
    pathMap[path] = false
  })

  //Listen for changes in the "content" dir
  chokidar.watch('content').on('all', async (e, path) => {
    if (
      e === 'change' ||
      (e === 'add' && path.includes('.md')) ||
      path.includes('.MD')
    ) {
      const valid = await lintMdFiles(path)
      pathMap[path] = valid

      const values = Object.values(pathMap)
      const validCount = values.reduce(
        (prev, curr) => (curr ? (prev += 1) : prev),
        0,
      )

      console.log(chalk.blue(`\n${validCount}/${values.length} Valid MD Files`))
      if (validCount === values.length)
        console.log(
          chalk.green(`\nAll files are valid. you can now commit you changes.`),
        )

      if (validCount === values.length && enableReadmeOverwrite) {
        console.log(chalk.yellow('Updating README.md'))
        const tableOfContents = mapContent()
        let readme = await readFile('READMEBASE.md', { encoding: 'utf-8' })

        readme += `\n${tableOfContents}`

        await writeFile('README.md', readme)
        console.log(chalk.green('README.md updated!'))
        console.log(
          chalk.yellow(
            '[WARNING]: Overwrite is enabled, DO NOT COMMIT README file. ',
          ),
        )
      }
    }
  })
  console.log(
    chalk.blue(
      figlet.textSync('-- Offshorly Docs --', {
        font: 'Bloody',
      }),
    ),
  )
})()
