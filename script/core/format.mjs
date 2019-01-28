const Settings = {
  mapping: {},
  force: null,
  defaultFormat: '',
}

function configure({ mapping = {}, ...rest }) {
  Settings.mapping = Object.assign({}, Settings.mapping, mapping)

  Object.assign(Settings, rest)

  return Settings
}

const getSpecifiedFormat = () => Settings.force

const getDefaultFormat= () => Settings.defaultFormat

function normalize(type = '') {
  const firstValidChar = type.search(/[A-Za-z0-9]/)

  if (type.length === 0 || firstValidChar === -1) {
    return ''
  }

  const normalized = type.slice(firstValidChar).trimRight().toLowerCase()
  return Settings.mapping[normalized] || normalized
}

export {
  configure,
  getSpecifiedFormat,
  getDefaultFormat,
  normalize,
}
