
"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
const registerpage = () => {
  const [email,setEmail] =useState("")
  const [password,setPassword] =useState("")
  const [userCreated,setUserCreated] = useState(false)
  const [creatingUser, setCreatinguser] =useState(false)
  const [error, setError]= useState(false)
    const Register  = async(ev)=>{
    ev.preventDefault()
    setCreatinguser(true)
  const response = await fetch ("api/register", 
      {
        method:"POST",
        body:JSON.stringify({email,password}),
        headers:{"content-type":"application/json"},
      }
      )
      if(response.ok){
        setUserCreated(true) 
      }else{
        setError(true)
      }
    setCreatinguser(false)
   }
  return (
    
    <section className='mt-8'>

      <h1 className='text-center text-primary text-4xl mb-4  '>Register</h1>
        {
          userCreated &&(

            <div className='text-center'>
              <h1>Proceed to     <Link href={"/login"} >
              login </Link>  </h1>
            </div>
          )
        }
        {error &&(
          <div className='text-center'>
            <h1>Username alrady exist or try again</h1>
          </div>
        )}
      <form className='block  max-w-xs mx-auto  ' onSubmit={Register}>
        <input type='email'
         placeholder='email'
         disabled={creatingUser}   
         value={email}
         onChange={ev=>setEmail(ev.target.value)}
         />
        <input type='password' 
        placeholder='password'
        disabled={creatingUser}
        value={password}
        onChange={ev=>setPassword(ev.target.value)}
         />

        <button  className='submit'  type='submit' disabled={creatingUser} >Register</button>

        <div className='my-4 text-center text-gray-500'>
          or Login with providers 
        </div> 
       
        <button className='flex justify-center gap-4'   >   <Image src="/google.png"  width={20}  height={20}/> Login with Google</button>

        <div className='text-center my-4'>
          Existing account ? {""} <Link  className='underline'  href={"/login"}> Login here  &raquo; </Link>
        </div>
      </form>
      <div>
      </div>
    </section>
  )
}

export default registerpage