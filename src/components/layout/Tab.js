
"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
const  Tab = ({isadmin}) => {


    const path =usePathname()
  return (
   <>
     <div className='flex  mx-auto gap-2 tabs justify-center mb-4'>
            <Link 
            className={path ==="/profile" ?"active":""}
             href={"/profile"}
             >Profile
                </Link>
                {isadmin && (
                    <>
                    <Link 
                    href={"/categories"}
                    className={path ==="/categories"?"active":""}
                    >Categories</Link>
                    <Link 
                    href={"/menu-items"}
                    className={/menu-items/.test(path)
                     ?"active":""}
                    >Menu Items</Link>
                    <Link 
                    href={"/users"}
                    className={/users/.test(path)
                     ?"active":""}
                    >Users</Link>
                    {/* <Link 
                     href={"/users"}
                     className={path ==="/users" ? "active" :""}
                    >Users</Link> */}
                    <Link 
                     href={"/orders"}
                     className={path ==="/orders" ? "active" :""}
                    >Orders</Link>
                    </>
                )}            
        </div>
   </>
  )
}

export default Tab