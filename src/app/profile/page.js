"use client"

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const page = () => {
    const session = useSession()

const [username, Setusername] =useState("") 
const [saved ,Setsaved]= useState(false)
const [isSaving, Setissaving]=useState(false)
const [image, Setimage ] =useState("")

const {status} = session




useEffect(()=>{
if (status === "authenticated"){
     Setusername(session.data.user.name)
     Setimage(session.data.user.image)
}  
},[session,status])
    console.log(session)
    if(status === "loading") {
        return "loading"
    }
    if(status === "unauthenticated"){ 
       return  redirect("/login")

    }

    
    const handleProfileinfoUpdate = async(ev)=>{
        ev.preventDefault()
        Setissaving(true)
            toast("saving profile")
      const response = await fetch("/api/profile", {
            method:"PUT",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify({name:username,image})
            
        })
       toast.success("Profile saved !!!")
        if(response.ok){
            Setsaved(true)
        }
    }




    const Handlefilechange = async(ev)=>{
       const files = ev.target.files;
       if(files?.length === 1){
           const data = new FormData
           data.set("file", files[0]) 
        toast("uploading....")
        const response = await fetch("/api/upload",{
                method:"POST",
                body:data,
                // headers :{"Content-Type":"multipart/form-data"}
            })  

               toast.success("upload complete")
           
        const link = await response.json()
        Setimage(link)
        
        }

    }
    
    
    // const userImage = session.data.user.image

  return (

    // <section></section> 


    <section className='mt-8'>
      <h1 className='text-center text-primary text-4xl mb-4  '>Profile</h1>
        <div  className='max-w-md mx-auto '>
            {
                isSaving && (
                    <h2 className='text-center bg-blue-100 border-blue  p-4 rounded-lg border-4   '   > Saving...</h2>
                )
            }

        
            {
                saved && (
                    <h2 className='text-center bg-green-100 p-4 rounded-lg border-4   '   >Profile saved ...</h2>
                )
            }
            <div className='flex gap-4  items-center'>
            <div>
                <div className=' p-2 rounded-lg  min-w-[80px]  max-w-[120px] relative '>  

                {image &&(

                 <Image  className='rounded-lg w-full h-full mb-1' src={image}  alt='profile' width={300} height={300}  />
                )}
                 <label>
                 <input type='file' className='hidden' onChange={Handlefilechange} />
                    <span className=' block border rounded-lg text-center p-1 cusor-pointer '>Edit</span>
                 </label>
                </div>
            </div>
            <form className='grow' onSubmit={handleProfileinfoUpdate}>
                <input  type='text' placeholder='First and lastname' value={username} 
                onChange={(ev)=>Setusername(ev.target.value) }
        
                />
                <input  type='email'  disabled={true} value={session.data.user.email}   />
                <button  type='submit' >Save</button>
            </form>
            </div>

        </div>


    </section>
  )  
}

export default page