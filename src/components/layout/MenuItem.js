"use client"
import Editableimage from '@/components/Editableimage'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Menuiemmsprice from './Menuiemmsprice'
 
const MenuItem = ({onSubmit, menuItem}) => {
    const [image, Setimage]=useState(menuItem?.image || "")
    const [description, Setdescription]=useState(menuItem?.description || "")
    const [baseprice, Setbaseprice]=useState(menuItem?.baseprice || "")
    const [name , Setitemname]=useState(menuItem?.name || "")
    // const [names , Setitemnames]=useState(menuItem?.names || "")
   const [sizes, SetSizes]= useState(menuItem?.sizes || []) 
   const [ extraingredientprices, Setextraingredient]= useState(menuItem?.extraingredientprices || [])
   const [category, SetCategory] = useState(menuItem?.category || "")
   const [categories, SetCategories]=useState([])

useEffect(()=>{

  fetch("/api/categories").then(response =>{
    response.json().then(category =>{
     SetCategories(category)
    })
  })

},[])


  //  const = addSize=>(){

  //  }


//   const addSize =()=>{
//         SetSizes(oldsizes =>{
//           return [...oldsizes , {names:"",price:0 }]
//         })
//   }



// const editSize =(ev, index, prop)=>{
//   const   newvalue =  ev.target.value;
//   SetSizes(prevsize =>{
//     const newsize = [...prevsize];
//     newsize[index][prop] =newvalue
//     return newsize 
//   })


//   const removeSize =(indextoremove)=>{
//     SetSizes(prev => prev.filter((v,index) =>index !== indextoremove))
//   }


// }

  return (
    <div>
 <form className='mt-8  max-w-lg mx-auto'  
 onSubmit={ev => onSubmit(ev, {image, description,baseprice,name,sizes, extraingredientprices,category}) }  
  >
          <div className='md:grid gap-4  items-start'  style={{gridTemplateColumns:".3fr .7fr"}}>
            <div className='max-w-[200px]'>
                <Editableimage   link={image} setLink={Setimage}   />
            </div>

          <div className='grow'>
          <label>    Item name</label>
        <input type='text'   value={name}    onChange={ev => Setitemname(ev.target.value)} />
              <label> Description</label>
        <input  type='text'    value={description}    onChange={(ev)=>Setdescription(ev.target.value)}   />
              <label>Category</label>
              <select value={category} onChange={(ev) => SetCategory(ev.target.value)}>
                  {categories?.length > 0 && categories.map(c=>(
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
              </select>
              <label>  Base Price</label>
        <input  type='text'  value={baseprice}  onChange={(ev) => Setbaseprice(ev.target.value)}   />
          <div>

            {/* <div className='bg-gray-200 p-2 rounded-md mb-2'> 
               <label>Sizes</label>   
               {sizes?.length > 0 && sizes.map((size,index) =>(
                <div className='flex items-end gap-2 '>
                  <div>
                  <input type='text' placeholder='Size name' value={size.name}   onChange={ev => editSize(ev, index)} />
                  </div>
                  <div> 
                  <input type='text' placeholder='Extra price'  value={size.price}    onChange={ev => editSize(ev, index, "price ")} />
                     </div>
                     <div>   <button className='bg-white  mb-2 '>X</button> </div>
                </div>
               )) }
               <button  onClick={addSize}  type='button'  className='bg-white'>Add size (like medium or large)</button>
            </div> */}

            <Menuiemmsprice  props={sizes} Setprops={SetSizes}  name={"Sizes "}  addLabel={"Add item sizes "} />
            <Menuiemmsprice  props={extraingredientprices} Setprops={Setextraingredient}  name={"Ingridient"}  addLabel={"Add ingredient "} />
            <button  type='submit' >Save</button>
          </div>
        </div>
          </div> 
    </form>
    </div>
  )
}

export default MenuItem