"use client"
import { useProfile } from '@/components/Useprofile'
import Tab from '@/components/layout/Tab'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Page = () => {
 const [users, Setusers]= useState([])



  useEffect(()=>{
        fetch("/api/users").then(response =>{
          response.json().then(data =>{
            
            Setusers(data)
          })
        }) 
  },[])

  const {loading , data}= useProfile()
  if(loading){
    return "Loading "
  }
   
  if(!data.admin){
    return "Not an admin"
  }
  return (
    <section className='mt-8 max-w-2xl mx-auto'>
      <Tab   isadmin={true} />
      <div className='mt-8'>
        {users?.length >0 && users.map(user =>(
          <div key={user._id} className='bg-gray-100 rounded-lg mb-2 p-1  px-4 items-center gap-4  flex  '>
            <div  className='grid grid-cols-2 md:grid-cols-3  gap-4 grow'>
              <div className='text-gray-900'>

              {!!user.name && (<span>{user.name}</span>)}
              {!user.name && (<span className='italic'>No name </span>)}
              </div>
            <span className='text-gray-500'>{user.email}</span>
            </div>
             <div>
            <Link className='button' href={"/users/"+user._id}>
              Edit
              </Link>
             </div>
             </div>
        ))}
      </div>
    </section>
  )
}

export default Page