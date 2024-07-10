"use client"
// import Editableimage from '@/components/Editableimage'
import { useProfile } from '@/components/Useprofile'
import Tab from '@/components/layout/Tab'
import { toast } from 'react-hot-toast'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Link from 'next/link'
import Left from '@/components/icons/Left'
import { redirect, useParams } from 'next/navigation'
import MenuItem from '@/components/layout/MenuItem'
import Deletebutton from '@/components/layout/Deletebutton'
// import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'


const Page = () => {


  const {id} = useParams()

const {loading, data} = useProfile()
// const [image, Setimage]=useState("")
//  const [description, Setdescription]=useState("")
//  const [baseprice, Setbaseprice]=useState("")
//  const [name , Setitemname]=useState("")
// const [sizes, setSizes]= useState([])
 const [redirecte , Setredirect]= useState(false)
  

 // after refactory

 const [ menuItem, Setmenuuitems]= useState(null)

 useEffect(()=>{
    fetch("/api/menu-items").then(response =>{
      response.json().then(data=>{
         const datas = data.find(i => i._id === id)
        // Setbaseprice(datas.baseprice)
        // Setdescription(datas.description)
        // Setitemname(datas.name)
        // Setimage(datas.image)

        // after refactory

        Setmenuuitems(datas)



      })
    })



 },[])

if(loading){

  return "Loading user info"
}
if(!data.admin){
  return "Not an admin"

}



// const addSize =()=>{
//    setSizes()
// }

const Handledelete = async()=>{
  toast("Deleting")
  const  response =  await  fetch("/api/menu-items?_id="+id,{
    method:"DELETE"
  })

  if(!response){
    toast.error("Check your internet")
  }else{
    toast.success("Deleted")
  }
  
  Setredirect(true)
}

  const  Handleformsubmit = async (ev, data)=>{
    ev.preventDefault()
    data ={...data, _id:id}
    toast("Creating- Menuitems")
    const response  = await  fetch("/api/menu-items",{
      method:"PUT",
      body:JSON.stringify(data),
      headers:{"Content-type":"application/json"}
    })

      if(!response.ok){
        toast.error("Check your network my brother")
      }else{
        toast.success("Menuitems-created")
      }
  
      Setredirect(true)
  }



  if(redirecte){
    return redirect("/menu-items")
  }





  return (
    <section   className='mt-8   '>
      <Tab  isadmin={true}   />
      <div className='max-w-md mx-auto mt-8'>
        <Link  href={"/menu-items"}   className='button' >
          <span>Show all menu items</span>
          <Left />
        </Link>
      </div>

      {/* <form className='mt-8  max-w-lg mx-auto'  onSubmit={Handleformsubmit}  >
          <div className='grid gap-4  items-start'  style={{gridTemplateColumns:".3fr .7fr"}}>
            <div className='max-w-[200px]'>
                <Editableimage   link={image} setLink={Setimage}   />
            </div>

          <div className='grow'>
          <label>    Item name</label>
        <input type='text'   value={name}    onChange={ev => Setitemname(ev.target.value)} />
              <label> Description</label>
        <input  type='text'    value={description}    onChange={(ev)=>Setdescription(ev.target.value)}   />
              <label>  Base Price</label>
        <input  type='text'  value={baseprice}  onChange={(ev) => Setbaseprice(ev.target.value)}   />
          <div> */}

            {/* <div className='bg-gray-200 p-2 rounded-md mb-2'> 
               <label>Sizes</label>   
               <button  onClick={addSize}  type='button'  className='bg-white'>Add size (like medium or large)</button>
            </div> */}
          {/* <button  type="submit">Save</button> */}
          {/* </div>
        </div>
          </div> 
    </form> */}



{/* After refactory */}

     
<MenuItem    onSubmit={Handleformsubmit}   menuItem={menuItem}  />

<div className='max-w-md mx-auto mt-4'>
  <div className='max-w-xs ml-auto pl-4'>
      <Deletebutton    onDelete={Handledelete}    label={"Delete this Menu!!"}   />
  </div>
</div>

    </section>
  )
}

export default Page