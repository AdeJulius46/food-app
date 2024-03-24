import React from 'react'

const MenuItemtile = ({Onadditem, ...item}) => {
  const {image,name ,description, baseprice,sizes ,category,extraingredientprices   }=item
  return (
    <div>

<div className='bg-gray-200 p-4 rounded-lg text-center hover:bg-white transition-all hover:shadow-md hover:shadow-black/25 '>
            <div className='text-center '> 
            <img  src={image}alt={'pizza'}  className='max-h-auto max-h-24 block mx-auto'/>

            </div>
            <h4 cl assName='font-semibold my-2 text-xl  '>{name}</h4>
            l<p className='text-gray-500 text-sm'>{description}
            </p>
            <button className='bg-primary mt-4   text-white rounded-full px-6  py-2 '   onClick={Onadditem}>
              {(sizes?.length > 0 || extraingredientprices?.length >0 ?(
                <span>From ${baseprice}</span>
              ): (
                <span>
                  Add  to cart   
                  {baseprice}
                </span>
              ))}
              </button>
        </div>

    </div>
  )
}

export default MenuItemtile