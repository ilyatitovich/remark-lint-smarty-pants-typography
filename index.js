// https://daringfireball.net/projects/smartypants/

import fs from 'fs'
import { lintRule } from 'unified-lint-rule'
import { visit } from 'unist-util-visit'
import { retext } from 'retext'
import retextSmartypants from 'retext-smartypants'

function isURL(text) {
  const urlRegex =
    /\b(?:https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[A-Z0-9+&@#\/%=~_|]/gi
  return urlRegex.test(text)
}

function smartyPantsTypography(tree, file, options) {
  try {
    const { cwd, history } = file
    const processedFilePath = `${cwd}/${history[0]}`
    const initialFileContent = String(file)
    let processedFileContent = initialFileContent

    visit(tree, 'text', node => {
      const oldText = node.value

      if (!isURL(oldText)) {
        const processedText = retext()
          .use(retextSmartypants, { ...options })
          .processSync(oldText)
          .toString()

        if (oldText !== processedText) {
          processedFileContent = processedFileContent.replace(
            oldText,
            processedText
          )
          file.message('Smart typography was applied', node)
        }
      }
    })

    if (initialFileContent !== processedFileContent) {
      fs.writeFileSync(processedFilePath, processedFileContent, 'utf-8')
      file.message('File has been overwritten')
    }
  } catch (error) {
    throw new Error(`Error processing Markdown: ${error.message}`)
  }
}

const remarkLintSmartyPantsTypography = lintRule(
  'remark-lint:smarty-pants-typography',
  smartyPantsTypography
)

export default remarkLintSmartyPantsTypography
