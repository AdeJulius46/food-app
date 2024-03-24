import React, { useState } from 'react'
import Chevrondown from '../icons/Chevrondown'
import Chevronup from '../icons/Chevronup'

function Menuiemmsprice({props, Setprops,name,addLabel }) {
    


  const [istoggle, Setistoggle]=useState(false)

    // const [sizes, SetSizes]= useState([]) 


    //  const = addSize=>(){
  
    //  }
  

    const toggle = ()=>{
      Setistoggle(prev => !prev)
    }
  
    const addSize =()=>{
          Setprops(oldsizes =>{
            return [...oldsizes , {name:"",price:0 }]
          })
    } 
  
  
  const editSize =(ev, index, prop)=>{
    const   newvalue =  ev.target.value;
    Setprops(prevsize =>{
      const newsize = [...prevsize];
      newsize[index][prop] =newvalue
      return newsize 
    })}

  

  
    const removeSize =(indextoremove)=>{
      Setprops(prev => prev.filter((v,index) =>index !== indextoremove))
    }
  

  return (
    <div>
            <div className='bg-gray-200 p-2 rounded-md mb-2'> 
            {istoggle &&(
              <>
                <button  className='flex inline-flex p-1 border-0  justify-start'  type='button' onClick={toggle} >
                  {istoggle &&(
                    < Chevrondown />
                    )}  
                 <span className='text-gray-700'>{name }</span>   
                 <span>{props.length}</span>
                 </button>
                 <div>
                  <div>
                  {props?.length > 0 && props.map((size,index) =>(
                  <div className='flex items-end gap-2 '>
                    <div>
                  <input type='text' placeholder='Size name' value={size.name}   onChange={ev => editSize(ev, index,"name")} />
                    </div>
                    <div> 
                    <input type='text' placeholder='Extra price'  value={size.price}    onChange={ev => editSize(ev, index, "price")} />
                        </div>
                        <div>   <button className='bg-white  mb-2'  type='button' onClick={()=> removeSize(index)} >X</button> </div>
                  </div>
                  )) }
                  <button  onClick={addSize}  type='button'  className='bg-white'>{addLabel}</button>
                    </div>
                  </div>
                    </>

            )}
                
                  {!istoggle &&(
                    <button  className='flex inline-flex p-1 border-0  justify-start'  type='button' onClick={toggle} >
                    {!istoggle &&(
                      < Chevronup />
                      )}  
                   <span className='text-gray-700'>{name }</span>
                   <span>{props.length}</span>   
                   </button>
                  )}
            </div>
    </div> 
  )
}

export default Menuiemmsprice