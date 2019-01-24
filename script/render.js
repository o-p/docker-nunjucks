const debug = require('debug')('docker-nunjucks')
const fs = require('fs')
const nunjucks = require('nunjucks')
const path = require('path')

const options = require('./options')({
  camelCase: true,
  partial: true,
})

debug('options: %O', options);

if (options.help) {
  console.log(require('./help')())
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
