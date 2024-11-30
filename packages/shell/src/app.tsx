import { useState, useEffect } from 'react'

const MyComponent = () => {
  const [counter, setCounter] = useState(0)
  useEffect(() => {
    setCounter(5)
  }, [])
  return (
    <>
      <h2>MyComponent rendering</h2>
      <button onClick={() => setCounter(counter + 1)}></button>
    </>
  )
}

export const App = () => {
  return (
    <html>
      <head>
        <title>Shell</title>
      </head>
      <body>
        <h1>App</h1>
        <div style={{ border: '10px solid red', padding: '20px' }}>
          <MyComponent />
        </div>
      </body>
    </html>
  )
}

export const MyConst = 'done for the day 123'
