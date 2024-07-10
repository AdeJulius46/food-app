"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import MenuItem from '../Menu/MenuItem'
import SectionHeader from './SectionHeader'

const HomeMenu = () => {

  const [bestSellers, Setbest]=useState([ ])
useEffect(()=>{
fetch("/api/menu-items").then(response =>{
  response.json().then(data=>{
    //  const best=    data.slice(-1)
     Setbest(data)
  })
})
},[])


  return (
   <>
   <section className=''>
    <div className='absolute right-0  left-0 w-full justify-start  '>
    <div className='absolute  left-0  -top-[70px] text-left '>
        <Image  src={"/sallad1.png"}  width={109}height={197}/>
    </div> 
    <div className='h-48   absolute  right-0 -top-[100px]    -z-10'>
        <Image  src={"/sallad2.png"}  alt='sallad' width={107} height={195}/>
    </div>
    </div>
   <div className='text-center'> 

   <SectionHeader  
   subHeader={"Checkout"}
   mainHeader={"Our Best sellers"}
   />

  
   </div>

   <div className='grid sm:grid-cols-3 gap-4'>
   {bestSellers.length > 0 && bestSellers.map(c =>(
    <MenuItem  {...c}   />
   ))}
  
   </div>
   </section>
   </>
  )
}

export default HomeMenu