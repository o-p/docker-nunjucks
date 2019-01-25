"use strict";

const { name: APP_NAME, version: APP_VERSION } = require('./package.json')

const debug = require('debug')(APP_NAME)
const DEV = process.env.DEBUG === APP_NAME || process.env.NODE_ENV === 'debug'

const options = require('./cli-options')({
  camelCase: true,
  partial: true,
})

const config = require('./config.json')

debug('options: %O', options)

if (options.help) {
  console.log(require('./cli-help')())
  process.exit(0)
} else if (options.version) {
  console.log(`${APP_NAME} v${APP_VERSION}`)
  process.exit(0)
}

require('./core/format').configure({
  defaultFormat: config.format.default,
  force: options.format,
  mapping: config.format,
})

require('./main')(options)
  .then((result) => {
    if (options.output) {
      fs.writeFileSync(output, result, {
        encoding: 'utf8',
      })
    } else {
      console.log(result)
    }

    process.exit(0)
  })
  .catch((err) => {
    console.error(err.name, err.message)
    debug('%O', err)
    process.exit(1)
  })
