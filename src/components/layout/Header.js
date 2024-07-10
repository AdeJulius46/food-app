"use client"
import React, { useContext,useState } from 'react'
import Link from "next/link";
import { signOut, useSession } from 'next-auth/react';
import { CartContext } from '../AppContex';
import Cart from '../icons/Cart';
import Bars2 from '../icons/Bars2';
const Header = () => {

  const session =useSession()
  console.log(session)
  const status = session?.status
  const userData =session.data?.user
  let username =userData?.name || userData?.email 
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const {cartProduct} =useContext(CartContext)
  if( username && username.includes(" ")){
    username =username.split(" ")[0]
  }




  function AuthLinks({status,  username}) {
    if (status === 'authenticated') {
      return (
        <>
          <Link href={'/profile'} className="whitespace-nowrap">
            Hello, { username}
          </Link>
          <button
            onClick={() => signOut()}
            className="bg-primary rounded-full text-white px-8 py-2">
            Logout
          </button>
        </>
      );
    }
    if (status === 'unauthenticated') {
      return (
        <>
          <Link href={'/login'}>Login</Link>
          <Link href={'/register'} className="bg-primary rounded-full text-white px-8 py-2">
            Register
          </Link>
        </>
      );
    }
  }
  

   
  return (
  //   <div>
  //          <header className=" flex items-center justify-between ">
  // <Link  className="text-primary  font-semibold text-2xl   " href={'/'}>  ST Pizza
  // </Link>
  //   <nav className="flex items-center gap-8 text-gray-500  font-semibold   ">
  //     <Link   href={'/'}> Home </Link>
  //     <Link   href={'/menu'}> Menu </Link>
  //     <Link   href={'/#about'}> About </Link>
  //     <Link   href={'/#contact'}> Contact</Link>
  //   </nav>


  //   <nav className='flex items-center gap-4  text-gray-500  font-semibold '>
  //   {status === "authenticated" &&(
  //       <>
  //       <Link  className='whitespace-nowrap'  href={"/profile"}>Hello ,{username} </Link>
  //     <button   href={'/register'}  onClick={() => signOut()}   className="bg-primary rounded-full    text-white px-4 py-2 "> Logout</button>
  //       </>
  //     )  }
  //     {status  === "unauthenticated" &&(
  //       <>
  //     <Link   href={'/login'}   className="   ">  Login</Link>
  //     <Link   href={'/login'}  className="bg-primary rounded-full    text-white px-4 py-2 ">  Register</Link>
  //       </>
  //     )}
  //         <Link href={"/cart"} className='relative  '>
  //            <Cart /> 
  //            {cartProduct?.length > 0 && (
  //            <span className='absolute -top-3 -right-5  px-2 text-white  py-1 text-xs  bg-primary p-1 rounded-full leading-3'>
  //              {cartProduct.length} 
  //            </span>
  //            )}
  //         </Link>

  //   </nav>
  //  </header>
  //  </div>

  <header>
  <div className="flex items-center md:hidden justify-between">
    <Link className="text-primary font-semibold text-2xl" href={'/'}>
      ST PIZZA
    </Link>
    <div className="flex gap-8 items-center">
      <Link href={'/cart'} className="relative">
          <Cart /> 
        {cartProduct?.length > 0 && (
          <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
        {cartProduct.length}
      </span>
        )}
      </Link>
      <button
        className="p-1 border"
        onClick={() => setMobileNavOpen(prev => !prev)}>
        <Bars2 />
      </button>
    </div>
  </div>
  {mobileNavOpen && (
    <div
      onClick={() => setMobileNavOpen(false)}
      className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center">
      <Link href={'/'}>Home</Link>
      <Link href={'/menu'}>Menu</Link>
      <Link href={'/#about'}>About</Link>
      <Link href={'/#contact'}>Contact</Link>
      <AuthLinks status={status}  username={username} />
    </div>
  )}
  <div className="hidden md:flex items-center justify-between">
    <nav className="flex items-center gap-8 text-gray-500 font-semibold">
      <Link className="text-primary font-semibold text-2xl" href={'/'}>
        ST PIZZA
      </Link>
      <Link href={'/'}>Home</Link>
      <Link href={'/menu'}>Menu</Link>
      <Link href={'/#about'}>About</Link>
      <Link href={'/#contact'}>Contact</Link>
    </nav>
    <nav className="flex items-center gap-4 text-gray-500 font-semibold">
      <AuthLinks status={status}  username={username} />
      <Link href={'/cart'} className="relative">
      <Cart /> 
        {cartProduct?.length > 0 && (
          <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
        {cartProduct.length}
      </span>
        )}
      </Link>
    </nav>
  </div>
</header>
  )
}

export default Header