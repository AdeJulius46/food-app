"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Tab from '@/components/layout/Tab'
import { useProfile } from '@/components/Useprofile'
import Form from '@/components/layout/Form'

import { toast } from 'react-hot-toast'


const page = () => {
    const {id} = useParams()


    const [useredit, Setuseredit]= useState(null)
 

    useEffect(()=>{
        fetch("/api/profile?_id="+id).then(response =>{
            response.json().then(user=>{
              //  const usere = user.find(u=> u._id ===id);
                Setuseredit(user)
                // console.log(useredit)
            })
        })
    },[]) 


  

    const handleProfileinfoUpdate = async(ev,data)=>{
      ev.preventDefault()
          toast("saving profile")
    const response = await fetch("/api/profile", {
          method:"PUT",
          headers:{"Content-type":"application/json"},
          body:JSON.stringify({...data, _id:id})
          
      })
     toast.success("Profile saved !!!")
      if(response.ok){
          // Setsaved(true)
      }
  }




    const {loading, data}= useProfile()
     if(loading){
        return "Loading"
     }
      if(!data.admin){
        return "Not an admin"
      }
  return (
    <section className='mt-8 mx-ato max-w-2xl'>
            <Tab isadmin={true}/>
            <div className='mt-8'>
             
             <Form   user={useredit}  onSave={handleProfileinfoUpdate}  />
            </div>
    </section> 
  )
}

export default page