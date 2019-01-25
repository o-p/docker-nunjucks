const fs = require('fs')
const path = require('path')

const RawData = require('./RawData')
const { normalize } = require('../format')

class FileRawData extends RawData {
  static validate({ input }) {
    return fs.existsSync(input) && fs.lstatSync(input).isFile()
  }

  * process() {
    const raw = fs.readFileSync(this.metadata.input, {
      encoding: 'utf8',
    })

    yield {
      raw,
      format: this.format
          || this.getFormatFromFileExtension()
          || this.constructor.DEFAULT_FORMAT
    }
  }

  getFormatFromFileExtension() {
    const { ext } = path.parse(this.metadata.input)
    return normalize(ext)
  }
}
