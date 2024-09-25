import path from 'node:path'
import NodeFederation from '@module-federation/node'
const { UniversalFederationPlugin } = NodeFederation

const __dirname = path.resolve('.')

const BASE_PLUGINS = []

const BASE_CONFIG = {
  devtool: 'source-map',
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
      static: {
        directory: path.resolve(__dirname, 'dist'),
      },
      devMiddleware: {
        writeToDisk: true,
      },
    },
  },
  {
    ...BASE_CONFIG,
    entry: {
      'no-op': './src/no-op.ts',
    },
    output: {
      path: path.resolve(__dirname, `dist/app`),
      library: {
        type: 'commonjs-module',
      },
      publicPath: 'auto',
    },
    target: 'async-node',
    plugins: BASE_PLUGINS.concat([
      new UniversalFederationPlugin({
        remoteType: 'script',
        useRuntimePlugin: true,
        name: 'shell_app',
        isServer: true,
        filename: 'shell-remote-entry.js',
        exposes: {
          './app': './src/app.tsx',
        },
        library: {
          type: 'commonjs-module',
        },
      }),
    ]),
  },
]
