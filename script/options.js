const MainOptions = [
  { name: 'data', alias: 'd', type: String, defaultOption: true, defaultValue: '', description: 'Raw string of input data' },
  { name: 'format', alias: 'f', type: String, defaultValue: 'plain-text', description: 'Data format, {italic "plain-text"} as default.' },
  { name: 'json', alias: 'j', type: String, description: 'Shorthand for {bold --format} {italic json} {bold --data} {italic <JSON>}' },

  { name: 'input', alias: 'i', type: String, description: 'File of input data; use {bold stdin} or {bold data} option if not set this option.' },
  { name: 'output', alias: 'o', type: String, description: 'File to output render result; render to {bold stdout} if not set this option.' },

  { name: 'theme', alias: 't', type: String, defaultValue: 'default', description: 'The theme name of output HTML' },
]

const AdvenceOptions = [
  { name: 'parsers', type: String, defaultValue: '/parsers', description: 'Path to custom parsers folder; {italic "/parsers"} as default.'},
  { name: 'templates', type: String, defaultValue: '/templates', description: 'Path to the templates folder; {italic "/templates"} as default.' },
  { name: 'themes', type: String, defaultValue: '/themes', description: 'Path to custom themes folder; {italic "/themes"} as default.'},

  { name: 'buffer-raw', type: Boolean, description: 'Set the option if you are expecting to provide your own parsers and deal with buffer instead of strings.' },
  { name: 'extension', type: String, defaultValue: 'njk', description: 'File extension of template files; {italic "njk"} as default.' },
]

const OtherOptions = [
  { name: 'help', alias: 'h', type: Boolean },
  { name: 'version', alias: 'v', type: Boolean },
]

module.exports = (config = {}) => require('command-line-args')([
  ...MainOptions,
  ...AdvenceOptions,
  ...OtherOptions,
], config)

module.exports.MainOptions = MainOptions
module.exports.AdvenceOptions = AdvenceOptions
module.exports.OtherOptions = OtherOptions
