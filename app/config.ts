
const pkg = require('../package.json')

interface AppVersion {
  major: number
  minor: number
  patch: number
}

interface Config {
  appName: string
  version: AppVersion
}

const values = [
  {
    key: 'appName',
    getter: (pkg) => pkg.appName,
  },
  {
    key: 'version',
    getter: (pkg): AppVersion => {
      const version = pkg.version as string
      const [major, minor, patch] = version.split('.').map(val => parseInt(val, 10))
      return {
        major,
        minor,
        patch,
      }
    },
  },
]

const makeConfig = () => {
  let tmpConfig = {}
  values.forEach(({ key, getter }) => {
    tmpConfig = {
      ...tmpConfig,
      get [key] () { return getter(pkg) },
    }
  })
  return tmpConfig as Config
}

export default makeConfig()
