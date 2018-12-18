
const path = require('path')

const ignore = pkg => {
  const rgx = new RegExp(`^${pkg}(/.*)?$`, 'i')

  return (ctx, req, cb) => {
    if (rgx.test(req)){
      return cb(null, 'commonjs ' + req);
    } else {
      cb()
    }
  }
}

const mainConfig = {
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.html'],
    alias: {
      src: path.join(__dirname, '../src'),
      components: path.join(__dirname, '../src/components'),
      containers: path.join(__dirname, '../src/containers'),
      actions: path.join(__dirname, '../src/redux/actions'),
      state: path.join(__dirname, '../src/redux/state'),
    }
  },
  node: {
    __dirname: false,
    __filename: false
  },
  externals: [
    ignore('electron')
  ],
  module: {
    rules: [
      {
        test: /^\.html$/,
        use: [
          'extract-loader',
          'html-loader?attrs=srcipt:src'
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: path.join(__dirname, './tsconfig.json')
            }
          }
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              singleton: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 2
            }
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ],
        exclude: /(node_modules|globalStyles)/,
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              singleton: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: true,
              importLoaders: 2
            }
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ],
        exclude: /(components|containers)/,
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8 * 1024 * 1024
            }
          }
        ]
      },
    ]
  }
}

module.exports = mainConfig
