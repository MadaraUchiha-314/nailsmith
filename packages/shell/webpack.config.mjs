import path from 'node:path'
import ModuleFederationPlugin from 'webpack/lib/container/ModuleFederationPlugin.js'

const __dirname = path.resolve('.')

const BASE_PLUGINS = []

const BASE_CONFIG = {
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules)/,
        use: {
          // `.swcrc` can be used to configure swc
          loader: 'swc-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
}

export default [
  {
    ...BASE_CONFIG,
    entry: {
      bootstrap: './src/bootstrap.tsx',
    },
    output: {
      path: path.resolve(__dirname, `dist/bootstrap`),
      filename: 'index.js',
      library: {
        name: 'shell_bootstrap',
        type: 'var',
      },
    },
    plugins: BASE_PLUGINS.concat([]),
    devServer: {
      port: 3001,
    },
  },
  {
    ...BASE_CONFIG,
    entry: {
      app: './src/app.tsx',
    },
    output: {
      path: path.resolve(__dirname, `dist/app`),
      library: {
        type: 'commonjs',
      },
    },
    plugins: BASE_PLUGINS.concat([
      new ModuleFederationPlugin({
        name: 'shell_app',
        filename: 'remoteEntry.js',
        exposes: {
          './app': './src/app.tsx',
        },
        library: {
          type: 'commonjs',
        },
      }),
    ]),
  },
]
