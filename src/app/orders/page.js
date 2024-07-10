"use client"
import { useProfile } from '@/components/Useprofile';
import SectionHeader from '@/components/layout/SectionHeader'
import Tab from '@/components/layout/Tab';
import dateTimefunction from '@/libs/dateTimefunction';
import Link from 'next/link';
import React, { useEffect ,useState} from 'react'

const Page = () => {
  const [orders, Setorders] =useState([]);
  const {loading, data:profile} =useProfile()

  useEffect(()=>{
    fetch("/api/orders").then(res =>{
      res.json().then(order=>{
        console.log(order)
        Setorders(order.reverse())


      })
    })

  },[])
  return (
<section className='mt-8 max-w-2xl mx-auto'>
  <Tab  isadmin={profile.admin}/>
  <div className='text-center'>
    {/* <SectionHeader  mainHeader={"Order"}  /> */}
    <div className='mt-8'>

  
    <div className=''>
      {orders.length > 0 && orders.map(orders=>(
        <div className='bg-gray-100 mb-2 p-4 rounded-lg  flex  flex-col md:flex-row gap-8 '>
          <div className='grow  flex  flex-col md:flex-row items-center  gap-6'>

          <div className='flex justify-start'>
          <div className={(orders.paid ? "bg-green-500 p-2 rounded-md  text-white w-24 text-center" :"bg-red-500 p-2 rounded-md  text-white w-24 text-center")}>
         {orders.paid? "Paid":"Not paid"}
          </div>
            </div>
            <div className=''>
              <div className='flex gap-3 items-center '>
              <div>
            {orders.userEmail}
              </div>
              <div className='text-sm'>
            {dateTimefunction(orders.createdAt)} 
              </div>
              </div>
              <div className='text-gray-500  text-sm'>
              {orders.cartProduct.map(p => p.name).join(" ,")}
              </div>
              </div>
          </div>
          <div className='justify-end  gap-2 flex  items-center whitespace-nowrap '>
            <Link href={"/orders/"+orders._id} className='button '>
              Show order 
            </Link>
            </div>
        </div>
      ))}
    </div>
      </div>
  </div>

</section>
  )
}

export default Page