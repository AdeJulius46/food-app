"use client"

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Tab from '@/components/layout/Tab'
import Link from "next/link"
const page = () => {
    const session = useSession()

const [username, Setusername] =useState("") 
const [image, Setimage ] =useState("")
const [phone, Setphone]= useState("")
const [streetAddress, SetstreetAddress]= useState("")
const [postalcode, Setpostalcode]= useState("")
const [city, Setcity]= useState("")
const [country, Setcountry]= useState("")
const [isadmin, Setadmin]=useState("")
const {status} = session




useEffect(()=>{ 
if (status === "authenticated"){
     Setusername(session.data.user.name)
     Setimage(session.data.user.image)
 fetch("/api/profile").then(response =>{
    response.json().then(data =>{
        console.log(data)
      Setpostalcode(data.postalcode)
      Setphone(data.phone)
      Setcity(data.city)
      Setcountry(data.country)
      SetstreetAddress(data.streetAddress)
      Setadmin(data.admin)
    })
 })
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
            toast("saving profile")
      const response = await fetch("/api/profile", {
            method:"PUT",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify({name:username,image,streetAddress,phone,country,city,postalcode})
            
        })
       toast.success("Profile saved !!!")
        if(response.ok){
            // Setsaved(true)
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
      {/* <h1 className='text-center text-primary text-4xl mb-4  '>Profile</h1> */}
        <Tab   isadmin={isadmin}/>
        <div  className='max-w-md mx-auto '>
            <div className='flex gap-4 '>
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
                <label>Email</label>
                <input  type='email'  disabled={true} value={session.data.user.email}   />
                <label>Phone Number</label>
                <input  type='tel'   placeholder="Phone number"       value={phone}  onChange={ev=>Setphone(ev.target.value)}   />
                <label>Address</label>
                    <input type='text' placeholder='Street Address'    value={streetAddress}  onChange={ev => SetstreetAddress(ev.target.value)} />
                    <div className='flex gap-4'>
                        <div className=''>
                <label>City</label>
                    <input type='text' placeholder='City'  value={city}   onChange={ev => Setcity(ev.target.value)} />
                        </div>
                        <div>
                <label>Postal code</label>
                    <input type='text' placeholder='Postal code'    value={postalcode} onChange={ev =>Setpostalcode(ev.target.value)} /> 
                        </div>
                    </div>
                <label>Country</label>
                    <input type='text' placeholder='Country'   value={country} onChange={ ev => Setcountry(ev.target.value)}  />
                <button  type='submit' >Save</button>
            </form>
            </div>

        </div>


    </section>
  )  
}

export default page