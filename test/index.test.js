import path from 'path'
import fs from 'fs-extra'
import { rollup } from 'rollup'
import isExecutable from 'executable'
import hashbangPlugin from '../src'

function fixture(...args) {
  return path.join(__dirname, 'fixture', ...args)
}

afterAll(() => fs.remove(fixture('output')))

async function build(input, output) {
  input = fixture(input)
  output = fixture(output)
  const bundle = await rollup({
    input,
    plugins: [
      hashbangPlugin()
    ]
  })
  await bundle.write({
    file: output,
    format: 'cjs'
  })
  return {
    executable: await isExecutable(output),
    output: await fs.readFile(output, 'utf8')
  }
}

test('hashbang', async () => {
  const { executable, output } = await build('hashbang.js', 'output/a.js')
  expect(executable).toBe(true)
  expect(output).toMatchSnapshot()
})

test('no hashbang', async () => {
  const { executable, output } = await build('no-hashbang.js', 'output/b.js')
  expect(executable).toBe(false)
  expect(output).toMatchSnapshot()
})
