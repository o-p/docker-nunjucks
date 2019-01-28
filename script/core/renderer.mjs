import nunjucks from 'nunjucks'

export default (dir) => {
  nunjucks.configure(dir, {
    autoescape: true,
  })

  return nunjucks.render
}
