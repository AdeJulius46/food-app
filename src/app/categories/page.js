"use client"

import Tab from '@/components/layout/Tab'
import React from 'react'
import { useEffect} from 'react'
const page = () => {

  const [isAdmin, Setadmin]=useState("")
   

  useEffect(()=>{
    fetch("api/profile").then(response=>{
        response.json().then(data =>{
          Setadmin(data.admin)
        })
    },[]) 
if(!isAdmin){
  return "NOT AN ADMIN"
}
  })


  return (
    <section  className='mt-8 max-w-lg mx-auto '>
      <Tab   isadmin={true}/>
        <div>Categories</div>
    </section>
  )
}

export default page