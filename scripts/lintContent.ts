import markdownlint from 'markdownlint'

async function lintContent(paths: string[]) {
  const options: markdownlint.Options = {
    files: paths,
    config: {
      MD013: {
        line_length: 250,
      },
    },
  }

  const result = await markdownlint.promises.markdownlint(options)
  return result
}

export default lintContent
