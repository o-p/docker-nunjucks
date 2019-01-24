const debug = require('debug')('docker-nunjucks')
const fs = require('fs')
const nunjucks = require('nunjucks')
const path = require('path')

const options = require('./options')({
  camelCase: true,
  partial: true,
})
const use = require('./core/useCoreModules')(debug)

console.log(process.env.NODE_ENV)

debug('options: %o', options);

if (options.help) {
  console.log(require('./cli-help')())
  process.exit(0)
} else if (options.version) {
  const { version } = require('./package.json')
  console.log(`Docker Nunjucks v${version}`)
  process.exit(0)
}

const format = getFormat(options)

const raw = use('raw', require('./core/getRawData')(options));

if (!raw) {
  console.error('💥 No raw data are found')
  process.exit(1)
}

const data = use('parser', require('./core/getParser')(format, options))(raw)
debug('data: %O', data)

const template = use('template', require('./core/getTemplate')(format, options))

nunjucks.configure(template.dir, {
  autoescape: true,
})

const result = nunjucks.render(template.filename, {
  data,
  raw,
  theme: use('theme', require('./core/getTheme')(options)),
})

print(result, options);
process.exit()

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
