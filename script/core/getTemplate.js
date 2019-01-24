const fs = require('fs')
const path = require('path')

const DEFAULT_TEMPLATE_FOLDER = path.join(__dirname, '../templates')

module.exports = (format, { templates, extension }) => {
  const filename = [format, extension].filter(Boolean).join('.')
  const dir = validate(templates, filename)
    || validate(DEFAULT_TEMPLATE_FOLDER, filename)
    || null

  return [{
    dir,
    filename,
  }]
}

function validate(dir, name) {
  const file = path.join(dir, name)
  return fs.existsSync(file) && dir
}
