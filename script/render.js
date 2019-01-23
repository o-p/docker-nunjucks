const debug = require('debug')('docker-nunjucks')
const fs = require('fs')
const nunjucks = require('nunjucks')
const path = require('path')

const MainOptions = [
  { name: 'format', alias: 'f', type: String, defaultValue: 'plain-text', description: 'Data format, {italic "plain-text"} as default.' },
  { name: 'json', alias: 'j', type: String, description: 'Shorthand for {bold --format} {italic json} {bold --data} {italic <JSON>}' },
  { name: 'data', alias: 'd', type: String, defaultOption: true, defaultValue: '', description: 'String of input data' },
  { name: 'input', alias: 'i', type: String, description: 'File of input data; use {bold stdin} or {bold data} option if not set this option.' },
  { name: 'output', alias: 'o', type: String, description: 'File to export render result; render to {bold stdout} if not set this option.' },
  { name: 'templates', type: String, defaultValue: '/templates', description: 'Path to the directory of nunjucks templates; {italic "/templates"} as default.' },
]

const AdvenceOptions = [
  { name: 'buffer-raw', type: Boolean, description: 'Set the option if you are expecting to provide your own parsers and deal with buffer instead of strings.' },
  { name: 'extension', type: String, defaultValue: 'njk', description: 'Extension filename of template files; {italic "njk"} is default extension.' },
]

const OtherOptions = [
  { name: 'help', alias: 'h', type: Boolean },
  { name: 'version', alias: 'v', type: Boolean },
]

const options = require('command-line-args')([
  ...MainOptions,
  ...AdvenceOptions,
  ...OtherOptions,
], {
  camelCase: true,
  partial: true,
})

debug('options: %O', options);

if (options.help) {
  require('./help')({ MainOptions, AdvenceOptions, OtherOptions })
  process.exit(0)
} else if (options.version) {
  const { version } = require('./package.json')
  console.log(`Docker Nunjucks v${version}`)
  process.exit(0)
}

const format = getFormat(options)

const raw = getRawData(options)
debug('raw: %s', raw)

const parser = getParser(format)
debug('Found matched parser:', parser instanceof Function)

const data = parser instanceof Function
  ? parser(raw)
  : null
debug('data: %O', data)

nunjucks.configure(options.templates, {
  autoescape: true,
})

const filename = [format, options.extension].filter(Boolean).join('.')
debug('template: %s', filename)

const result = nunjucks.render(filename, {
  data,
  raw,
})

print(result, options);
process.exit()

function getRawData({ json, data, input, bufferRaw }) {
  switch (true) {
    // read from file
    case !!input:
      debug(`---- Read raw data from file <${input}> ----`)
      return bufferRaw
        ? fs.readFileSync(input)
        : fs.readFileSync(input).toString('utf8')

    case typeof json === 'string' && !!json.length:
      debug('---- Read raw data from options "json" ----')
      return json

    case typeof data === 'string' && !!data.length:
      debug('---- Read raw data from options "data" ----')
      return data

    case !process.stdin.isTTY:
      debug('---- Read raw data from StdIn ----')
      const stdin = process.platform === 'win32'
        ? 0
        : '/dev/stdin'
      return fs.readFileSync(stdin, 'utf8')

    default:
      console.error('💥 No data are found')
      process.exit(1)
  }
}

function getParser(format) {
  const file = path.resolve(`parsers/${format}.js`)
  return fs.existsSync(file) && require(file)
}

function getFormat(userOptions) {
  return (userOptions.hasOwnProperty('json') ? 'json' : userOptions.format)
}

function print(rawString, { output }) {
  if (output) {
    debug(`---- Output result to file: ${output} ----`)
    return fs.writeFileSync(output, rawString, {
      encoding: 'utf8',
    })
  }

  debug('---- Output result to stdout ----')
  return console.log(rawString)
}
