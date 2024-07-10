"use client"
import Editableimage from '@/components/Editableimage'
import { useProfile } from '@/components/Useprofile'
import Tab from '@/components/layout/Tab'
import { toast } from 'react-hot-toast'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Link from 'next/link'
import Left from '@/components/icons/Left'
import { redirect } from 'next/navigation'
import MenuItem from '@/components/layout/MenuItem'

const Page = () => {

const {loading, data} = useProfile()
// const [image, Setimage]=useState("")
//  const [description, Setdescription]=useState("")
//  const [baseprice, Setbaseprice]=useState("")
//  const [name , Setitemname]=useState("")
 const [redirecte , Setredirect]= useState(false)
// after refactorung 




if(loading){

  return "Loading user info"
}
if(!data.admin){
  return "Not an admin"

}




  const  Handleformsubmit = async (ev, data)=>{
    ev.preventDefault()
    toast("Creating- Menuitems")
    const response = await  fetch("/api/menu-items",{
      method:"POST",
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
          <div>
          <button  type="submit">Save</button>
          </div>
        </div>
          </div> 
    </form> */}
    {/* After refactoring */}

   <MenuItem    onSubmit={Handleformsubmit}/>

    </section>
  )
}

export default Page