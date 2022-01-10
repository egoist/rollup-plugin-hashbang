import fs from "fs";
import path from "path";
import { Plugin } from "rollup";
import MagicString from "magic-string";

export default (): Plugin => {
  const shebangs: Map<string, string> = new Map();
  const shebangRe = /^\s*(#!.*)/;
  const outputFiles: Set<string> = new Set();

  return {
    name: "hashbang",

    transform(code, id) {
      let match;

      // eslint-disable-next-line no-cond-assign
      if ((match = shebangRe.exec(code))) {
        shebangs.set(id, match[1]);
        const str = new MagicString(code);
        str.remove(match.index, match[1].length);
        return {
          code: str.toString(),
          map: str.generateMap({ hires: true }),
        };
      }

      return null;
    },

    renderChunk(
      code,
      { isEntry, facadeModuleId, fileName },
      { file, dir, sourcemap }
    ) {
      if (!isEntry || !facadeModuleId || !shebangs.has(facadeModuleId)) return;

      outputFiles.add(file || path.resolve(dir || process.cwd(), fileName));

      const s = new MagicString(code);
      s.prepend(shebangs.get(facadeModuleId) + "\n");

      return {
        code: s.toString(),
        map: sourcemap ? s.generateMap({ hires: true }) : undefined,
      };
    },

    async writeBundle() {
      await Promise.all(
        [...outputFiles].map(async (file) => {
          await fs.promises.chmod(file, 0o755 & ~process.umask());
        })
      );
    },
  };
};
