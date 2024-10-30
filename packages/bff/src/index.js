import express from 'express'
import { init, loadRemote } from '@module-federation/runtime'
import nodeRuntimePlugin from '@module-federation/node/runtimePlugin'
import { revalidate } from '@module-federation/node/utils'

export async function run() {
  const app = express()
  const port = 3000

  init({
    name: '@nailsmith/bff',
    remotes: [
      {
        name: '@nailsmith/shell',
        entry: 'http://localhost:3001/app/shell-remote-entry.js',
        alias: 'shell_app',
        remoteType: 'commonjs-module',
      },
    ],
    plugins: [nodeRuntimePlugin()],
  })

  app.get('/', async (_, res) => {
    console.log('[LOG] GET /')
    const shouldReload = await revalidate()
    if (shouldReload) {
      console.log('[LOG] shouldReload is true')
    }
    const MyConst = (await loadRemote('shell_app/app'))?.MyConst
    res.send(`Hello World! MyConst is ${MyConst}`)
  })

  app.listen(port, () => {
    console.log(`nailsmith:bff listening on port ${port}`)
  })
}

run()
