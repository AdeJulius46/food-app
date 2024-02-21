"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { signIn} from "next-auth/react"
const page = () => {
 
    const [email,setEmail]= useState("")
    const [password,setPassword]=useState("")
    const [login , Setlogin] = useState(false)



    const Login = async(ev)=>{
        ev.preventDefault()
    Setlogin(true)
  await  signIn("credentials",{email, password}) 
    Setlogin(false)
    }
  return (




    <div className='my-12'>
      <h1 className='text-center text-primary text-4xl mb-4  '>Login</h1>

<form className='block  max-w-xs mx-auto  '   onSubmit={Login}>
        <input type='email'
         placeholder='email'
         value={email}
         disabled={login}
         onChange={ev=>setEmail(ev.target.value)}
         />
        <input type='password' 
        placeholder='password'
        value={password}
        disabled={login}
        onChange={ev=>setPassword(ev.target.value)}
         />

        <button  className='submit'  type='submit'  disabled={login} >Login</button>

        <div className='my-4 text-center text-gray-500'>
          or Login with providers 
        </div> 
       
        <button className='flex justify-center gap-4'   >   <Image src="/google.png"  width={20}  height={20}/> Login with Google</button>

        <div className='text-center my-4'>
          New account ? {""} <Link  className='underline'  href={"/register"}> Register here  &raquo; </Link>
        </div>
      </form>

    </div>
  )
}

export default page