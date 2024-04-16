
"use client"
import { CartContext } from '@/components/AppContex'
import SectionHeader from '@/components/layout/SectionHeader'
import React, { useContext, useEffect } from 'react'

const page = () => {
    const {clearCart}= useContext(CartContext)
useEffect(()=>{
if(typeof window.console !=="undefined"){
    if(window.location.href.includes("clear-cart=1")){
        clearCart()
    }
}

},[])


  return (
   <section className='max-w-2xl mx-auto text-center mt-8 '>
    <SectionHeader mainHeader="Your Order"/>
    <div className='my-4'>

    <p>Thanks for your order</p>
    <p>We will call you when your order will be on the way</p>
    </div>
   </section>
  )
}

export default page