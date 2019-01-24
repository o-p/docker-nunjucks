const { EOL } = require('os')

module.exports = (raw) => {
  const lines = raw.split(EOL)
  return {
    raw,
    data: lines.map(line => JSON.parse(line)),
  }
}
