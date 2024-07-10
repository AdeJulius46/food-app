"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { signIn} from "next-auth/react"
const Page = () => {
 
    const [email,setEmail]= useState("")
    const [password,setPassword]=useState("")
    const [login , Setlogin] = useState(false)



    const Login = async(ev)=>{
        ev.preventDefault()
    Setlogin(true)
  await  signIn("credentials",{email, password ,callbackUrl:"/"} ) 
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
        {/* <button className='flex justify-center gap-4'   onClick={() => signIn("google",{callbackUrl:"/"})}   >   <Image src="/google.png"  width={20}  height={20}/> Login with Google</button> */}
       
        {/* <button className='flex justify-center gap-4'  type='submit'   onClick={() => signIn("google")}  >   <Image src="/google.png"  width={20}  height={20}/> Login with Google</button> */}
      
        <button
        type='button'
          onClick={() => signIn('google', {callbackUrl:'/'})}
          className="flex gap-4 justify-center">
          <Image src={'/google.png'} alt={''} width={24} height={24} />
          Login with google
        </button>
       
        <div className='text-center my-4'>
          New account ? {""} <Link  className='underline'  href={"/register"}> Register here  &raquo; </Link>
        </div>
      </form>

    </div>
  )
}

export default Page