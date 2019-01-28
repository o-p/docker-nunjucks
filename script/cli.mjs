import DebugFactory from 'debug'

import cliHelper from './cli-help/index.mjs'
import cliOptions from './cli-options.mjs'
import config from './config.json'
import { configure } from './core/format'
import main from './main'
import Package from './package.json'

import { allFilesIn } from './core/helper/file-system'

allFilesIn('/Users/chrischu/repo/docker-nunjucks/script/core')
  .then(console.log.bind(console))
// process.exit()

// const {
//   name: APP_NAME,
//   version: APP_VERSION
// } = Package;

// const debug = DebugFactory(APP_NAME)

// const DEV = process.env.DEBUG === APP_NAME || process.env.NODE_ENV === 'debug'

// const options = cliOptions({
//   camelCase: true,
//   partial: true,
// })

// debug('options: %O', options)

// if (options.help) {
//   console.log(cliHelper())
//   process.exit(0)
// } else if (options.version) {
//   console.log(`${APP_NAME} v${APP_VERSION}`)
//   process.exit(0)
// }

// configure({
//   defaultFormat: config.format.default,
//   force: options.format,
//   mapping: config.format,
// })

// // Determine which kind input raw data we are using, from top to bottom.
// const raws = [
//     DirectoryRawData,
//     FileRawData,
//     StringArrayRawData,
//     StdinRawData,
//   ]
//   .search(type => type.validate(options))
//   .of(metadata)

// main(options)
//   .then((result) => {
//     if (options.output) {
//       fs.writeFileSync(output, result, {
//         encoding: 'utf8',
//       })
//     } else {
//       console.log(result)
//     }

//     process.exit(0)
//   })
//   .catch((err) => {
//     console.error(err.name, err.message)
//     debug('%O', err)
//     process.exit(1)
//   })
