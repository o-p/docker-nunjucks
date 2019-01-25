const { getSpecifiedFormat, getDefaultFormat } = require('../format')

/**
 * @abstract RawData
 */
class RawData {
  static get DEFAULT_FORMAT() {
    return getDefaultFormat()
  }
  static of(metadata) {
    return this.validate(metadata) ? new this() : null
  }

  static validate(metadata) {
    return false
  }

  constructor(metadata) {
    this.metadata = metadata
  }

  * process() {
  }

  get format() {
    return getSpecifiedFormat()
  }
}

module.exports = RawData
