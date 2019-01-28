import RawData from './RawData'

export default class StringArrayRawData extends RawData {

  constructor(...args) {
    super(...args)
  }
  static validate({ data }) {
    return Array.isArray(data) && data.length
  }

  * process() {
    const format = this.format || this.constructor.DEFAULT_FORMAT

    for (const raw in this.metadata.data) {
      !(yield Promise.resolve({ raw, format }))
    }

    // this.metadata.data.forEach((raw) => {
    //   !(yield Promise.resolve({ raw, format }))
    // })
  }
}