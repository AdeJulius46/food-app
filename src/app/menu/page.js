"use client"
import MenuItem from '@/components/Menu/MenuItem'
import SectionHeader from '@/components/layout/SectionHeader'
import React, { useEffect, useState } from 'react'

const Page = () => {

const [categories, Setcategories]= useState([])
const [menuitems, Setmenuitem]= useState([])

    useEffect(()=>{
        fetch("/api/categories").then(response =>{
            response.json().then(cat=>{
               Setcategories(cat)
            })
        });
        fetch("/api/menu-items").then(response=>{
            response.json().then(menu=>{
                Setmenuitem(menu)
            })
        })

    },[])
  return (
    <section className='mt-8 '> 
        {categories.length > 0 && categories.map(c=>(
            <div className='' key={c._id}>
                <div className='text-center'>

                <SectionHeader  mainHeader={c.name}  />
                </div>
                <div className='grid sm:grid-cols-3  gap-4 mt-6 mb-12 '>
                {menuitems.filter(item => item.category === c._id).map(item =>(
                            <MenuItem key={item._id}
                              {...item}/>
                            
                            ))} 
                            </div>
            </div>
        ))}
    </section>
  )
}

export default Page