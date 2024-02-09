import React from 'react'

const MenuItem = () => {
  return (
    <div>
          <div className='bg-gray-200 p-4 rounded-lg text-center hover:bg-white transition-all hover:shadow-md hover:shadow-black/25 '>
            <div className='text-center '>
            <img  src={"/pizza.png"} alt={'pizza'}  className='max-h-auto max-h-24 block mx-auto'/>

            </div>
            <h4 cl assName='font-semibold my-2 text-xl  '>Pepperoni Pizza</h4>
            <p className='text-gray-500 text-sm'>Lorem jdoid id9ud ux9i w9us9wdj wd98jd oax98wd xh89whd2 ihxwd2hdn 
            </p>
            <button className='bg-primary mt-4   text-white rounded-full px-6  py-2  '>Add to cart</button>
        </div>
    </div>
  )
}

export default MenuItem