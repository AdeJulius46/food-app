
"use client"
import Cartproduct from '@/components/Menu/Cartproduct'
import { CartContext, Cartproductprice } from '@/components/AppContex'
import AdressInput from '@/components/layout/AdressInput'
import SectionHeader from '@/components/layout/SectionHeader'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

const page = () => {
    const {clearCat}= useContext(CartContext)
    const [Order, Setorder]= useState();
    const {id} =useParams()

useEffect(()=>{
if(typeof window.console !=="undefined"){
    if(window.location.href.includes("clear-cart=1")){
        clearCat();
    }
}
if(id){
    fetch("/api/orders?_id="+id).then(res =>{
        res.json().then(orderData =>{
            Setorder(orderData)

        })
    })
}


},[])
 console.log(Order) 


 let subtotal = 0;
 if(Order?.cartProduct){
    for(const product of Order?.cartProduct){
        subtotal += Cartproductprice(product)}
 }


  return (
   <section className='max-w-2xl mx-auto text-center mt-8 '>
    <div className='text-center mb-8'>

    <SectionHeader mainHeader="Your Order"/>
    <div className='my-4'>

    <p>Thanks for your order</p>
    <p>We will call you when your order will be on the way</p>
    </div>
    </div>
    {Order && (
        <div className='grid md:grid-cols-2 md:     gap-16'>
        <div>
            {Order.cartProduct.map(product =>(
                <Cartproduct product={product} />
            ))}
            <div className=' text-right py-2 text-gray-500 '>
                Subtotal:<span className='text-black font-bold'>{subtotal}</span>
            <br></br>
                Delivery:<span className='text-black font-bold'>$5</span>
                        <br/>
            Total:<span className='text-black font-bold'>{subtotal + 5 }</span>
            </div>
        </div>

        <div>
            <div className='bg-gray-100 p-4  rounded-lg'> 
                <AdressInput  address={Order} />
            </div>
        </div>
        </div>
    )}
   </section>
  )
}

export default page