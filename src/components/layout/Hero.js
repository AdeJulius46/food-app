import React from 'react'
import Image from "next/image"
import Right from '../icons/Right'
const Hero = () => {
  return (
  <section className='hero  mt-6'>
    <div className='py-12'>
    <h1 className='text-4xl  font-semibold'>Everything <br/> is  better  <br/> with   a&nbsp;  <span className='text-primary'>Pizza </span>  </h1>
        <p className='my-6  text-grey-500 text-sm '> Pizza is the missing piece that make every day complete , a simple yet delicious meal</p>
        <div className='flex text-sm gap-4'>

          <button className='bg-primary uppercase text-white px-4 py-2  gap-2 rounded-full  flex item-center'> Order now   
          <Right />
           </button>
          <button className='flex gap-2 py-2 text-grey-600 font-semibold'>learn more
          <Right />
          </button>
        </div>
    </div>
        <div className=' relative'>

        <Image src={"/pizza.png"}  layout={'fill'} objectFit={'contain'}    alt={"Piza"} />
        </div>
  </section>

  )
}

export default Hero