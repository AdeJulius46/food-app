import React, { useContext ,useState} from 'react'
import { toast } from 'react-hot-toast'
import { CartContext } from '../AppContex'
import MenuItemtile from './MenuItemtile'
import Image from 'next/image'
const MenuItem = (menuItem) => {

  const {image,name ,description, baseprice,sizes ,category,extraingredientprices   }=menuItem
  const {addToCart}=useContext(CartContext) 
const [showpopup, Setshowpopup]=useState(false)
const [selected, Setselected]=useState(sizes?.[0] || null )
const [selectedextras, Setselectedextra]=useState([])

  const Handleaddtocart =()=>{
    if (showpopup){
      addToCart(menuItem, selected,selectedextras);
      toast.success("Added to cart ")
      Setshowpopup(false)
      return;
    }
    if(sizes.length === 0 && extraingredientprices.length === 0){
        addToCart(menuItem)
        toast.success("Added to cart")
    }else{ 
        Setshowpopup(true)
    }
  }


  let selectedPrice =  baseprice
  if(selected){
     selectedPrice += selected.price  }

     if(selectedextras?.length > 0){
      for (const extra of  selectedextras){
        selectedPrice += extra.price
      }

     }




  const Handleextra =(ev,extrathing)=>{
const checked = ev.target.checked;
if(checked){
  Setselectedextra(prev => [...prev, extrathing])
}else(
  Setselectedextra(prev=>{
    prev.filter(e => e.name !== extrathing.name)
  })
)
    
  }
  return (
    <>
    {showpopup && (
      <div className='fixed top-0 left-0 right-0  inset-0 flex items-center bg-black/80 justify-center'  onClick={()=> Setshowpopup(false)}> 
        <div className='bg-white p-2 max-w-md  'onClick={ev=> ev.stopPropagation()}> 
        <div className='overflow-y-scroll p-2' style={{maxHeight:"c  lc(100vh - 8 0px)"}}>
        <Image src={image} 
        alt={name}
        width={300}
        height={200}
        className="mx-auto"
        />
        <h2 className='text-lg mb-2 font-bold text-center '>{name}</h2>
         <p className='text-center  text-gray-500 text-sm '>{description}</p> 
         <p className='text-center  text-gray-500 text-sm '>{description}</p>

         {sizes.length  && (
           <div className='bg-gray-200 rounded p-2'>
              <h3 className='text-center text-gray-700'>Pick your Size</h3>
              {sizes.map(size =>(
                <label key={size._id}  className='block p-2 rounded-md mb-1 flex items-center  border gap-1 '>
                  <input  name={size}    type='radio' checked={selected?.name === size.name }     onClick={()=> Setselected(size)} /> {size.name}  ${baseprice + size.price}
                </label>
              ))}
          </div>
         )}

         {extraingredientprices.length > 0 && (
           <div className='bg-gray-200 rounded p-2 mt-4'>
           <h3 className='text-center text-gray-700'>Any extra!!</h3>
           {extraingredientprices.map(extra =>(
             <label key={extra._id}   className='block p-2 rounded-md mb-1 flex items-center  border gap-1 '>
               <input  name={extra}   onClick={(ev)=>Handleextra(ev,extra)}   type='checkbox' /> {extra.name}  ${extra.price}
             </label>
           ))}
       </div>
         )}
              <button type='button ' className='primary mt-4 sticky bottom-2'  onClick={Handleaddtocart}   >Add to cart {selectedPrice} </button>
              <button className='mt-2 ' onClick={() => Setshowpopup(false)}>
                Cancel
              </button>
         </div>

        </div>

      </div>
    )}

      <MenuItemtile   Onadditem={Handleaddtocart} {...menuItem}  />
    </>
  )
}

export default MenuItem