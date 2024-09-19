import express from 'express'
import { init, loadRemote } from '@module-federation/runtime'
import nodeRuntimePlugin from '@module-federation/node/runtimePlugin'

export async function run() {
  const app = express()
  const port = 3000

  init({
    name: '@nailsmith/bff',
    remotes: [
      {
        name: '@nailsmith/shell',
        entry: 'http://localhost:3001/remoteEntry.js',
        alias: 'shell',
      },
    ],
    plugins: [nodeRuntimePlugin()],
  })

  const MyConst = (await loadRemote<{ MyConst: string }>('shell'))?.MyConst

  app.get('/', (_, res) => {
    res.send(`Hello World! MyConst is ${MyConst}`)
  })

  app.listen(port, () => {
    console.log(`nailsmith:bff listening on port ${port}`)
  })
}

run()
