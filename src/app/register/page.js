
"use client"

import React, { useState } from 'react'
import Image from 'next/image'
const registerpage = () => {
  const [email,setEmail] =useState("")
  const [password,setPassword] =useState("")

   const Register =(ev)=>{
    ev.preventDefault()
  fetch ("api/register",
    {
      method:"POST",
      body:JSON.stringify({email,password}),
      headers:{"content-type":"application/json"},
       
    }
    )
   }
  return (
    
    <section className='mt-8'>
      <h1 className='text-center text-primary text-4xl mb-4  '>Register</h1>
      <form className='block  max-w-xs mx-auto  ' onSubmit={Register}>
        <input type='email'
         placeholder='email'   
         value={email}
         onChange={ev=>setEmail(ev.target.value)}
         />
        <input type='password' 
        placeholder='password'
        value={password}
        onChange={ev=>setPassword(ev.target.value)}
         />
        <button  type='submit'>Register</button>
        <div className='my-4 text-center text-gray-500'>
          or Login with providers 
        </div> 
       
        <button className='flex justify-center gap-4'>   <Image src="/google.png"  width={20}  height={20}/> Login with Google</button>
      </form>
      <div>
      </div>
    </section>
  )
}

export default registerpage