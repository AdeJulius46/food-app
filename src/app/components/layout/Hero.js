import React from 'react'
import Image from "next/image"
const Hero = () => {
  return (
  <section className='grid grid-cols-2'>
    <div>
    <h1 className='text-4xl font-semibold'>Everything is better with a pizza  </h1>
        <p className='my-4 text-grey-500'> Pizza is the missing piece that make every day complete , a simple yet delicious meal</p>
        <div>
          
        </div>
          <button>

          </button>
    </div>
        <div className=' relative'>

        <Image src={"/pizza.png"}  layout={'fill'} objectFit={'contain'}    alt={"Piza"} />
        </div>
  </section>

  )
}

export default Hero