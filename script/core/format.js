const Settings = {
  mapping: {},
  force: null,
  defaultFormat: '',
}

module.exports.configure = ({ mapping = {}, ...rest }) => {
  Settings.mapping = Object.assign({}, Settings.mapping, mapping)

  Object.assign(Settings, rest)

  return Settings
}

module.exports.getSpecifiedFormat = () => Settings.force

module.exports.getDefaultFormat = () => Settings.defaultFormat

module.exports.normalize = (type = '') => {
  const firstValidChar = type.search(/[A-Za-z0-9]/)

  if (type.length === 0 || firstValidChar === -1) {
    return ''
  }

  const normalized = type.slice(firstValidChar).trimRight().toLowerCase()
  return Settings.mapping[normalized] || normalized
}
