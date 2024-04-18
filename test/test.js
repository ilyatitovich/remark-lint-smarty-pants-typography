import fs from 'fs'
import path from 'path'
import assert from 'node:assert/strict'
import test from 'node:test'
import { remark } from 'remark'
import { compareMessage } from 'vfile-sort'
import remarkLintSmartyPantsTypography from '../index.js'

const invalidMdPath = path.join(import.meta.dirname, 'docs', 'invalid.md')
const validMdPath = path.join(import.meta.dirname, 'docs', 'valid.md')

const invalidMd = fs.readFileSync(invalidMdPath, 'utf-8')
const validMd = fs.readFileSync(validMdPath, 'utf-8')

test('process straight symbols', async () => {
  const result = await remark()
    .use(remarkLintSmartyPantsTypography)
    .process(invalidMd)

  result.messages.sort(compareMessage)

  assert.deepEqual(
    result.messages.map(d => d.reason),
    [
      'File has been overwritten',
      'Smart typography was applied',
      'Smart typography was applied'
    ]
  )
})

test('no symbols to process', async () => {
  const result = await remark()
    .use(remarkLintSmartyPantsTypography)
    .process(validMd)

  assert.strictEqual(result.messages.length, 0)
})
