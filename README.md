
# rollup-plugin-hashbang

[![NPM version](https://img.shields.io/npm/v/rollup-plugin-hashbang.svg?style=flat)](https://npmjs.com/package/rollup-plugin-hashbang) [![NPM downloads](https://img.shields.io/npm/dm/rollup-plugin-hashbang.svg?style=flat)](https://npmjs.com/package/rollup-plugin-hashbang) [![CircleCI](https://circleci.com/gh/egoist/rollup-plugin-hashbang/tree/master.svg?style=shield)](https://circleci.com/gh/egoist/rollup-plugin-hashbang/tree/master)  [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/egoist/donate) [![chat](https://img.shields.io/badge/chat-on%20discord-7289DA.svg?style=flat)](https://chat.egoist.moe)

## Install

```bash
yarn add rollup-plugin-hashbang --dev
```

## Usage

With `rollup.config.js`:

```js
import hashbang from 'rollup-plugin-hashbang'

export default {
  plugins: [
    hashbang()
  ]
}
```

In:

```js
#!/usr/bin/env node

console.log('hi')
```

Output:

```js
#!/usr/bin/env node
'use strict';

console.log('hi')
```

Hashbang is preserved and the output file will be executable.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**rollup-plugin-hashbang** © [EGOIST](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by EGOIST with help from contributors ([list](https://github.com/egoist/rollup-plugin-hashbang/contributors)).

> [egoist.moe](https://egoist.moe) · GitHub [@EGOIST](https://github.com/egoist) · Twitter [@_egoistlily](https://twitter.com/_egoistlily)
