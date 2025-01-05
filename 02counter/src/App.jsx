import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [counter, setCount] = useState(15)

  const addcnt =()=>{
    setCount(counter + 1)
  }
  const delcnt =()=>{
    if(counter>0)
    {
      setCount(counter - 1)
    }
    else{
      setCount(counter)
    }
  }

  return (
    <>
    <h1>Counter Project</h1>
    <p>Counter = {counter}</p>
    <button onClick = {addcnt}>Add</button>
    <button onClick = {delcnt}>Delete</button>
    </>
  )
}

export default App
