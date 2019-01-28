import fs from 'fs'
import path from 'path'

import StringArrayRaw from './core/raw/StringArrayRawData'

export default (options, logger = () => {}) => {

  // const format = getFormat(options)
  // const list = extractRawData(options)
  const raw = StringArrayRaw.of(options)

  console.log(raw.next())
  // const v = raw.process()
  // logger(v)
  // process.exit(1)
  for (const each of raw.process()) {
    console.log('-------')
    console.log(each)
    console.log('xxxxxxx')
  }
  // const pipeline = Promise.all(list.map((raw) => {

  // }))
}

// const raw = use('raw', require('./core/getRawData')(options));

// if (!raw) {
//   console.error('💥 No raw data are found')
//   process.exit(1)
// }

// const data = use('parser', require('./core/getParser')(format, options))(raw)
// debug('data: %O', data)

// const template = use('template', require('./core/getTemplate')(format, options))

// nunjucks.configure(template.dir, {
//   autoescape: true,
// })

// const result = nunjucks.render(template.filename, {
//   data,
//   raw,
//   theme: use('theme', require('./core/getTheme')(options)),
// })

// print(result, options);
// process.exit()

// function getFormat(userOptions) {
//   return (userOptions.hasOwnProperty('json') ? 'json' : userOptions.format)
// }

// function print(rawString, { output }) {
//   if (output) {
//     debug(`---- Output result to file: ${output} ----`)
//     return fs.writeFileSync(output, rawString, {
//       encoding: 'utf8',
//     })
//   }

//   debug('---- Output result to stdout ----')
//   return console.log(rawString)
// }
