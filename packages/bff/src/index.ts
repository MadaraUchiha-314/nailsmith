import express from 'express'

export function run() {
  const app = express()
  const port = 3000

  app.get('/', (_, res) => {
    res.send('Hello World!')
  })

  app.listen(port, () => {
    console.log(`nailsmith:bff listening on port ${port}`)
  })
}

run()
