
"use client"
import React, { useEffect, useState } from 'react'
import { SessionProvider } from "next-auth/react";
import { toast } from 'react-hot-toast';
import { createContext } from 'react';
// import { lstatSync } from 'fs';

export const CartContext = createContext({})


export  const Cartproductprice =(cartProduct)=>{
  let price = cartProduct.baseprice
  if(cartProduct.size){
    price += cartProduct.size.price
  }
  if(cartProduct.extra?.length > 0 ){
     for (const extra of cartProduct.extra){
      price += extra.price
     }

  }
  return price
} 
  const AppProvider  = ({children}) => {
    const[cartProduct, Setcartproduct]=useState([])
    const ls= typeof window !== "undefined"? window.localStorage:null
    
    useEffect(()=>{
      if(ls && ls.getItem("cart")){
        Setcartproduct(JSON.parse(ls.getItem("cart")))
        
      }
    },[])
    
    
    const clearCat = ()=>{
      Setcartproduct([])
      saveCartproduct([])
    }
    
    
    
    const removeCartProduct =(indextoremove)=>{
      Setcartproduct(prevcartProduct =>{
        const newProduct = prevcartProduct.filter((v,index)=> index !==indextoremove)
        saveCartproduct(newProduct)
        return newProduct 
      });
      toast.success("Product removed")
    }


  

  function saveCartproduct(cartProduct ){
    if(ls){
      ls.setItem("cart",JSON.stringify(cartProduct))
    }
    
  }



  function addToCart(product,size=null, extra=[]){
    Setcartproduct(prevProduct =>{
      const cartProduct ={...product,size,extra}
      const newProduct = [...prevProduct, cartProduct]
      saveCartproduct(newProduct)
      return newProduct
    })
  }
   return (
   
<SessionProvider >
  <CartContext.Provider value={{cartProduct, Setcartproduct,addToCart, clearCat,removeCartProduct,Cartproductprice }}>
  {children}
  </CartContext.Provider>
</SessionProvider>
   )
 }
 
 export default AppProvider