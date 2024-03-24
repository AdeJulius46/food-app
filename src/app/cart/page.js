
"use client"

import { CartContext } from '@/components/AppContex'
import SectionHeader from '@/components/layout/SectionHeader'
import React, { useContext } from 'react'
import Image from 'next/image'
import AdressInput from '@/components/layout/AdressInput'

const page = () => {
    const {cartProduct,Cartproductprice,removeCartProduct } = useContext(CartContext)

    let total=0
    for (const p of cartProduct){
        total += Cartproductprice(p)
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
                            </h3 >
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
                    Total: <span className='text-lg font-semibold  pl-2  '>
                        
                    ${total}
                        </span>     
                </div>

         </div>   

         <div className='bg-gray-200 p-4 rounded-lg'>
            <h2>CheckOut</h2>
            <form>
                            <AdressInput address={{}} />                    
                <button type='submit'>
                    Pay ${total}
                </button>
            </form>
         </div>   
        </div>
    </section>
    
  )
}

export default page  