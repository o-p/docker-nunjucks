const nunjucks = require('nunjucks')

module.exports = (dir) => {
  nunjucks.configure(dir, {
    autoescape: true,
  })

  return nunjucks.render
}
