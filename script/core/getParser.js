const fs = require('fs')
const path = require('path')

const DEFAULT_PARSERS = path.join(__dirname, '../parsers')

module.exports = function getParser(format, { parsers }) {

  const file = fileExists(parsers, format)
    || fileExists(DEFAULT_PARSERS, format)
    || null

  if (file) {
    return [
      require(file),
      `Parser path ${file}.js`
    ]
  }
  return [
    raw => ({ raw, data: null }),
    'No valid parser are found, skipped.'
  ]
}

function fileExists(dir, name) {
  const file = path.join(dir, name)
  return fs.existsSync(`${file}.js`) && file
}
