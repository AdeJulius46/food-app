
"use client"
import { SessionProvider } from "next-auth/react";
 import React, { Children } from 'react'
 
 const AppProvider = ({children}) => {
   return (
   
<SessionProvider>
  {children }
</SessionProvider>
   )
 }
 
 export default AppProvider