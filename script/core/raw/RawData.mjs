import { getSpecifiedFormat, getDefaultFormat } from '../format.mjs'

/**
 * @abstract RawData
 */
export default class RawData {
  get DEFAULT_FORMAT() {
    return getDefaultFormat()
  }

  static of(metadata) {
    return this.validate(metadata) && new this(metadata)
  }

  // static of(...types) {
  //   const subtypes = types.filter(type => type.prototype instanceof this)

  //   return (metadata => {
  //     const subtype = subtypes.find(subtype =>
  //       subtype.validate instanceof Function &&
  //       subtype.validate(metadata)
  //     )
  //     return subtype instanceof new subtype(metadata)
  //   })
  // }

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
