import Image from 'next/image'
import React from 'react'
import MenuItem from '../Menu/MenuItem'
import SectionHeader from './SectionHeader'

const HomeMenu = () => {
  return (
   <>
   <section className=''>
    <div className='absolute right-0  left-0 w-full justify-start  '>
    <div className='absolute  left-0  -top-[70px] text-left '>
        <Image  src={"/sallad1.png"}  width={109}height={197}/>
    </div> 
    <div className='h-48   absolute  right-0 -top-[100px]    -z-10'>
        <Image  src={"/sallad2.png"}  width={107} height={195}/>
    </div>
    </div>
   <div className='text-center'> 

   <SectionHeader 
   subHeader={"Checkout"}
   mainHeader={"Menu"}
   />

  
   </div>

   <div className='grid grid-cols-3 gap-4'>
    <MenuItem />
    <MenuItem />
    <MenuItem />
    <MenuItem />
    <MenuItem />
    <MenuItem />
  
   </div>
   </section>
   </>
  )
}

export default HomeMenu