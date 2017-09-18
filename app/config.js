
const values = [
  { key: 'appName', getter: (pkg) => pkg.appName },
  { key: 'version', getter: (pkg) => pkg.version },
]

const config = {}

const setConfig = (pkg) => {
  values.forEach(({ key, getter }) => {
    const val = getter(pkg)
    if (val !== undefined) {
      config[key] = val
    }
  })
}

const publicConfig = {
  get setConfig() { return setConfig }
}

values.forEach(({ key }) => {
  Object.defineProperty(publicConfig, key, {
    enumerable: true,
    configurable: false,
    get: () => config[key]
  })
})

module.exports = publicConfig
