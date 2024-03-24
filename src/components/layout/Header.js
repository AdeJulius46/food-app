"use client"
import React, { useContext } from 'react'
import Link from "next/link";
import { signOut, useSession } from 'next-auth/react';
import { CartContext } from '../AppContex';
import Cart from '../icons/Cart';
const Header = () => {

  const session =useSession()
  console.log(session)
  const status = session?.status
  const userData =session.data?.user
  let username =userData?.name || userData?.email 
  const {cartProduct} =useContext(CartContext)
  if( username && username.includes(" ")){
    username =username.split(" ")[0]
  }

  return (
    <div>
           <header className="flex items-center justify-between ">
  <Link  className="text-primary  font-semibold text-2xl   " href={'/'}>  ST Pizza
  </Link>
    <nav className="flex items-center gap-8 text-gray-500  font-semibold   ">
      <Link   href={'/'}> Home </Link>
      <Link   href={'/menu'}> Menu </Link>
      <Link   href={'/#about'}> About </Link>
      <Link   href={'/#contact'}> Contact</Link>
    </nav>


    <nav className='flex items-center gap-4  text-gray-500  font-semibold '>
    {status === "authenticated" &&(
        <>
        <Link  className='whitespace-nowrap'  href={"/profile"}>Hello ,{username} </Link>
      <button   href={'/register'}  onClick={() => signOut()}   className="bg-primary rounded-full    text-white px-4 py-2 "> Logout</button>
        </>
      )  }
      {status  === "unauthenticated" &&(
        <>
      <Link   href={'/login'}   className="   ">  Login</Link>
      <Link   href={'/login'}  className="bg-primary rounded-full    text-white px-4 py-2 ">  Register</Link>
        </>
      )}

        {cartProduct?.length > 0 && (
          <Link href={"/cart"} className='relative  '>
             <Cart /> 
             <span className='absolute -top-3 -right-5  px-2 text-white  py-1 text-xs  bg-primary p-1 rounded-full leading-3'>
               {cartProduct.length} 
             </span>
          </Link>
        )}
    </nav>
   </header>
    </div>
  )
}

export default Header