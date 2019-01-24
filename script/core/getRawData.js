module.exports = (options) => {
  const [raw, info] = getRawData(options)

  return [
    raw instanceof Buffer && !options.bufferRaw
      ? raw.toString('utf8')
      : raw,
    info,
  ]
}

function getRawData({ json, data, input }) {
  switch (true) {

    case !!input:
      return [
        require('fs').readFileSync(input),
        `read from file <${input}>`
      ]

    case typeof json === 'string' && !!json.length:
      return [
        json,
        'read from option "json"'
      ]

    case typeof data === 'string' && !!data.length:
      return [
        data,
        'read from option "data"'
      ]

    case !process.stdin.isTTY:
      const stdin = process.platform === 'win32' ? 0 : '/dev/stdin'
      return [
        require('fs').readFileSync(stdin),
        `read from stdin <${stdin}>`
      ]

    default:
      return [
        null,
        'no available data to read'
      ]
  }
}
