const { MainOptions, AdvenceOptions, OtherOptions } = require('../cli-options')

module.exports = () => require('command-line-usage')([
  {
    raw: true,
    content: require('chalk').yellow(require('./banner'))
  },
  {
    header: 'Synopsis',
    content: [
      `$ yarn build [...options] {italic <DATA>}`,
      `$ yarn build [...options] {bold --data} {italic <DATA>}`,
      `$ yarn build [...options] {bold --input} {italic <FILE_NAME>}`,
      `$ echo <DATA> | yarn build [...options]`,
    ],
  },
  {
    header: 'General Options',
    optionList: MainOptions,
  },
  {
    header: 'Advence Usage',
    optionList: AdvenceOptions,
  },
  {
    header: 'Others',
    optionList: OtherOptions,
  },
  {
    header: 'Examples',
    content: [
      `$ cat package.json | yarn build {bold --json}`,
      `$ yarn build {bold --input} {italic package.json} {bold --json}`
    ],
  }
])
