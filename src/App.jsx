import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charsAllowed, setCharsAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef=useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str+="0123456789"
    if(charsAllowed) str+="!@#$%^&*<>/\|+-"

    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)

      setPassword(pass)
    }

  }, [length, numberAllowed, charsAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllowed, charsAllowed, passwordGenerator])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-lg rounded-lg my-8 px-4 text-black bg-gray-800 pb-4 font-semibold'>
      <h1 className='text-4xl text-center text-white pt-4'>Password Generator</h1>
      <div className='flex flex-col sm:flex-row shadow rounded-lg overflow-hidden my-4 gap-1'>
        <input 
          type="text" 
          value={password}
          className='outline-none w-full px-3 py-1 my-4 sm:mr-2 rounded-lg'
          placeholder='password'
          readOnly
          ref={passwordRef}
        />
        <button onClick={copyPasswordToClipboard} className='bg-orange-300 outline-none text-black px-3 py-2 my-4 sm:ml-2 rounded-lg'>Copy</button>
      </div>
      <div className='flex flex-col sm:flex-row text-sm gap-x-2 pb-4 bg-green-100 p-4 rounded-lg text-black'>
        <div className='flex items-center gap-x-1 mb-2 sm:mb-0'>
          <input 
            type="range"
            min={6}
            max={32}
            value={length}
            className='cursor-pointer w-full'
            onChange={(e)=>{setLength(e.target.value)}}
          />
          <label className="w-16 text-sm">Length[{length}]</label>
        </div>
        <div className='flex items-center gap-x-1 mb-2 sm:mb-0'>
          <input type="checkbox" 
            defaultChecked={numberAllowed}
            id='numberInput'
            onChange={()=>{
              setNumberAllowed((prev)=>!prev)
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
            defaultChecked={charsAllowed}
            id='charInput'
            onChange={()=>{
              setCharsAllowed((prev)=>!prev)
            }}
          />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </div>
  </>
  
  )
}

export default App
