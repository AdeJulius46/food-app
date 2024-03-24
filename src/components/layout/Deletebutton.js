import React, { useState } from 'react'

const Deletebutton = ({label, onDelete}) => {


    const [showconfirm , Setshowconfirm]=useState(false)


    if(showconfirm){
        return(
            <div className='fixed inset-0 flex h-full justify-center  bg-black/80  items-center '>
            <div className=' bg-white p-4 rounded-lg'>
            <h3>Are you sure you want to delete </h3>
            <div className='flex gap-2 mt-1'>
            <button type="button"  onClick={()=>Setshowconfirm (false)}> 
          Cancel
            </button>
            <button type="button" className='primary'  onClick={onDelete}> 
                    Yes&nbsp;Delete
                </button>
            </div>
            </div>
            </div>
        )
    }
  return (
    <div>
        <button type="button"  onClick={()=>Setshowconfirm(true) }> 
     {label}
  </button>
    </div>
  )
}

export default Deletebutton