exports.MainOptions = [
  { name: 'format', alias: 'f', type: String, defaultValue: 'plain-text', description: 'Data format, {italic "plain-text"} as default.' },
  { name: 'json', alias: 'j', type: String, description: 'Shorthand for {bold --format} {italic json} {bold --data} {italic <JSON>}' },
  { name: 'data', alias: 'd', type: String, defaultOption: true, defaultValue: '', description: 'String of input data' },
  { name: 'input', alias: 'i', type: String, description: 'File of input data; use {bold stdin} or {bold data} option if not set this option.' },
  { name: 'output', alias: 'o', type: String, description: 'File to export render result; render to {bold stdout} if not set this option.' },
  { name: 'templates', type: String, defaultValue: '/templates', description: 'Path to the directory of nunjucks templates; {italic "/templates"} as default.' },
]

exports.AdvenceOptions = [
  { name: 'buffer-raw', type: Boolean, description: 'Set the option if you are expecting to provide your own parsers and deal with buffer instead of strings.' },
  { name: 'extension', type: String, defaultValue: 'njk', description: 'Extension filename of template files; {italic "njk"} is default extension.' },
]

exports.OtherOptions = [
  { name: 'help', alias: 'h', type: Boolean },
  { name: 'version', alias: 'v', type: Boolean },
]
