import fs from 'fs'
import path from 'path'
import MagicString from 'magic-string'

const pify = fn => (...args) =>
  new Promise((resolve, reject) =>
    fn(...args, (err, result) => {
      return err ? reject(err) : resolve(result)
    })
  )

export default () => {
  const chmod = pify(fs.chmod)
  const shebangs = new Map()
  const shebangRe = /^\s*(#!.*)/
  const outputFiles = new Set()

  return {
    name: 'hashbang',

    transform(code, id) {
      let match

      // eslint-disable-next-line no-cond-assign
      if ((match = shebangRe.exec(code))) {
        shebangs.set(id, match[1])
        const str = new MagicString(code)
        str.remove(match.index, match[1].length)
        return {
          code: str.toString(),
          map: str.generateMap({ hires: true })
        }
      }

      return null
    },

    renderChunk(code, { isEntry, facadeModuleId, fileName }, { file, dir }) {
      if (!isEntry || !shebangs.has(facadeModuleId)) return

      outputFiles.add(file || path.resolve(dir, fileName))

      const res = {}
      const str = new MagicString(code)
      str.prepend(shebangs.get(facadeModuleId) + '\n')
      res.code = str.toString()
      res.map = str.generateMap({ hires: true })
      return res
    },

    async writeBundle() {
      await Promise.all(
        [...outputFiles].map(async file => {
          await chmod(file, 0o755 & ~process.umask())
        })
      )
    }
  }
}
