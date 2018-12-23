
const pkg = require('../package.json')

interface AppVersion {
  major: number
  minor: number
  patch: number
  suffix?: string
}

interface Config {
  appName: string
  version: AppVersion
}

interface ConfigDef<K extends keyof Config = keyof Config> {
  key: K
  getter?: (pkg: any) => Config[K]
  value?: Config[K]
}

const nonNumericRgx = /\D/
const versionSplitter = /^(\d*)(\D.*)$/

const values: ConfigDef[] = [
  {
    key: 'appName',
    getter: (pkg) => pkg.appName,
  },
  {
    key: 'version',
    getter: (pkg): AppVersion => {
      const version = pkg.version as string
      let [major, minor, patch, ...rest] = version.split('.')
      let suffix: string | undefined

      if (rest.length > 0) {
        suffix = rest.join('.')
      } else if (nonNumericRgx.test(patch)) {
        const groups = versionSplitter.exec(patch)
        patch = groups![1] || '0'
        suffix = groups![2]
      }

      return {
        major: parseInt(major, 10),
        minor: parseInt(minor, 10),
        patch: parseInt(patch, 10),
        suffix,
      }
    },
  },
]

const makeConfig = () => {
  let tmpConfig = {} as Config
  values.forEach(({ key, getter, value }) => {
    if (getter !== undefined) {
      const getVal = getter
      tmpConfig = {
        ...tmpConfig,
        get [key] () { return getVal(pkg) },
      }
    } else if (value) {
      tmpConfig = {
        ...tmpConfig,
        [key]: value,
      }
    }
  })
  return tmpConfig
}

export default makeConfig()
