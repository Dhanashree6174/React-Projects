import { useState , useCallback } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [characterAllowed, setcharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(()=>{
    let pass = "";//to store the generated password
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcefghijklmnopqrstuvwyz"; //data from which password will be generated
    if(numberAllowed) str+="012356789";
    if(characterAllowed) str+="!@#$%^&*~;*/.?-_";

    for(let i=1; i<=length; i++)
    {
      let char = Math.floor(Math.random()*str.len + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  return (
    <>
      <div className = "w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800 text-center"> Password Generator
      <div className = 'flex center shadow-md rounded-lg overflow-hiddden mb-4 '>
        <input type="text" value = {password} className = 'outline-none rounded-md w-full py-1 my-2 px-3 text-center' placeholder='password' readOnly />
        <button className='bg-blue-700 text-white'>copy</button>
      </div>
      </div>
    </>
  )
}

export default App
