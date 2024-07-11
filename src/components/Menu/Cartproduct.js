import React from 'react'
import Image from 'next/image'
import { Cartproductprice } from '../AppContex'
const Cartproduct = ({product,onRemove, Cartproductpric}) => {
  return (
    <div>
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
                                        <div key={extra._id}> {extra.name} + ${extra.price}</div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className='text-lg font-semibold '> {Cartproductprice(product)}</div>
                        <div>
                            <button  onClick={()=> onRemove(index)}>Remove</button>
                        </div>
                        </div>
    </div>
  )
}

export default Cartproduct