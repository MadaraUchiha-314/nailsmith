import path from 'node:path'

const __dirname = path.resolve('.')

export default {
  entry: {
    index: './src/index.js',
  },
  devtool: 'source-map',
  target: 'async-node',
  output: {
    library: { type: 'commonjs-module' },
    path: path.resolve(__dirname, `dist`),
  },
  plugins: [],
}
