"use client"
// import Editableimage from '@/components/Editabeimage'
import { useProfile } from '@/components/Useprofile'
import Right from '@/components/icons/Right'
import Tab from '@/components/layout/Tab'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import React from 'react'


const page = () => {

const [MenuItems, SetMenuItes]= useState([])



  useEffect(()=>{
  fetch("/api/menu-items").then(response  =>{
    response.json().then(data=>{
    SetMenuItes(data)
    }) 
  })
  },[])




const {loading, data} = useProfile()
if(loading){
  return "Loading user info"
}
if(!data.admin){
  return "Not an admin"

}





  return (
    <section   className='mt-8  max-w-lg mx-auto  '>
     <Tab isadmin={true}/>
     <div className='mt-8'>

     <Link  className='button flex '
      href={"/menu-items/new"}
      
      > Create New items 
          <Right />
      </Link>
      </div>

      <div>
        <h2 className='text-sm text-gray-500 mt-8'>Edit menu items: </h2>

        <div className='grid grid-cols-3 gap-2 '>

        {MenuItems?.length > 0 && MenuItems.map(c =>(
          <Link  href={"/menu-items/edit/"+c._id} className='bg-gray-300 p-4 rounded-lg '> 
           <div className='relative'>
            <Image src={c.image} alt={''}  width={200} height={200}  className='rounded-md'/>

           </div>
           <div className='text-center'>
            {c.name} 
           </div>

          </Link>
        ))}
        </div>
         
      </div>
    </section>
  )
}

export default page