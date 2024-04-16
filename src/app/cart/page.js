
"use client"

import { CartContext } from '@/components/AppContex'
import SectionHeader from '@/components/layout/SectionHeader'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import Image from 'next/image'
import toast from "react-hot-toast";
import AdressInput from '@/components/layout/AdressInput'
import { useProfile } from '@/components/Useprofile'

const page = () => {
    const {cartProduct,Cartproductprice,removeCartProduct } = useContext(CartContext)
    const [addres, SetAddress]=useState({})

     const {data:profiData} = useProfile()

     console.log(cartProduct)
     useEffect(()=>{
        if(profiData?.city){
            const {phone,country, city,streetAddress,postalcode}=profiData
            const adressfromprofile= {
                phone,country, city,streetAddress,postalcode
            }
            SetAddress(adressfromprofile)
        }

     },[profiData])


     const proceedtoCheckout = async (ev)=>{
        ev.preventDefault()
          const promise = new Promise((resolve, reject) => {
            fetch('/api/checkout', {
              method: 'POST',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify({
                addres,
                cartProduct,
              }),
            }).then(async (response) => {
              if (response.ok) {
                resolve();
                window.location = await response.json();
              } else {
                reject();
              }
            });
          });
      
          await toast.promise(promise, {
            loading: 'Preparing your order...',
            success: 'Redirecting to payment...',
            error: 'Something went wrong... Please try again later',
          })
     }

    let Subtotal=0
    for (const p of cartProduct){
        Subtotal += Cartproductprice(p)
    }

     const HandleAddresschange =(propName, value)=>{
            SetAddress(prevAdress =>({...prevAdress, [propName]:value}))
     }
  return (
    <section className='mt-8'>
        <div  className='text-center'>
          <SectionHeader mainHeader={"Cart"} />
        </div>
        <div className='grid grid-cols-2 gap-4 '>
          <div>
                {cartProduct?.length ===0 &&(
                    <div>No products in your shopping  cart</div>
                )}
                {cartProduct?.length > 0 &&  cartProduct.map((product,index) =>(
                    <div className='flex  gap-4 mb-2 border-b py-2 items-center'>
                        <div className='w-24'>
                            <Image src={product.image} width={240} height={240} />
 
                        </div>
                        <div  className='grow'>
                            <h3 className='font-semibold '>
                        {product.name}
                            </h3  >
                            {product.size &&(
                                <div className='text-sm  text-gray-7 00 '>
                                   Size: <span>{product.size.name}</span> 
                                </div>

                            )}
                            {product.extra?.length > 0 && (

                                <div className='text-sm  text-gray-500'>
                                   {product.extra.map(extra =>(
                                        <div> {extra.name} + ${extra.price}</div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className='text-lg font-semibold '> {Cartproductprice(product)}</div>
                        <div>
                            <button  onClick={()=> removeCartProduct(index)}>Remove</button>
                        </div>
                        </div>
                ))}
                <div className='py-4 text-right pr-16'>
                    SubTotal: <span className='text-lg font-semibold  pl-2  '>
                        
                    ${Subtotal} 
                        </span>     
                </div>

                <div className='py-4 text-right pr-16'>
                    <div>
                        <div>
                    Delivery: <span className='text-lg font-semibold  pl-2  '>
                    ${5} 
                    </span>
                        </div>
                    <div>
                        Total:  <span className='text-lg font-semibold  pl-2  '>
                    ${Subtotal + 5} 
                    </span>
                          </div>
                        
                        </div>     
                </div>

         </div>   

         <div className= 'bg-gray-200 p-4 rounded-lg'>
            <h2>CheckOut</h2>
            <form  onSubmit={proceedtoCheckout}>
                            <AdressInput address={addres }    Setaddressprops={HandleAddresschange} />                    
                <button type='submit'>
                    Pay ${Subtotal +5}
                </button>
            </form>   
         </div>   
        </div>
    </section>
    
  )
}

export default page  