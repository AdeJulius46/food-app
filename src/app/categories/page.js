"use client"
import Deletebutton from '@/components/layout/Deletebutton'
import Tab from '@/components/layout/Tab'
import { useProfile } from '@/components/Useprofile'
import { data } from 'autoprefixer'
import { useEffect, useState} from 'react'
// import { json } from 'stream/consumers'
import toast from 'react-hot-toast'

const page = () => {
 const {loading:profileLoading,data:profile}= useProfile();
  const [newCategory, Setnewcategory]=useState("")
  const [categories, SetCategory] = useState([])
  const [editedCategory, Seteditedcategory] =useState(null)

  
  
   useEffect(() => {
    Fetch()
   },[])



   const Fetch =()=>{
    fetch("/api/categories").then(response =>{
      response.json().then(data =>{
        SetCategory(data)
      })
    })

   }


 if(profileLoading){
  return "Loading user info" 
 }

 if(!profile.admin){
  return "Not an admin"
 }






 const handledeleteclick =  async(_id)=>{
  toast("Deleting")
   const response = await fetch('/api/categories?_id='+_id,{
  method:"DELETE",
})

if(!response){
  toast.error("Couldnt Delete")
}else{
  toast.success("Deleted")
}

Fetch()
 }


 const handleSubmit = async(ev)=>{ 

  
  if(editedCategory){
  toast("Updating  your new category")
  }else{
    toast("Creating your new category")
  }
  ev.preventDefault()
  const data = {name:newCategory}
  if(editedCategory){
    data._id = editedCategory._id   
  } 
 const response = await fetch("/api/categories",{
    method:  editedCategory ? "PUT" : "POST",
    body:JSON.stringify(data),
    header:{"Content-Type":"application/json"}

  })
  
  Fetch()
  Setnewcategory("")

  if(editedCategory){
    if(!response.ok){
      toast.error("Not created")
    }else{
      toast.success(" Updated Category ")
    } 
  }else{
    if(!response.ok){
      toast.error("Not created")
    }else{
      toast.success("Category created")
    }
  }

  
 }



   
  return (
    <section  className='mt-8 max-w-lg mx-auto '>
      <Tab  isadmin={true}/>
    <form className='mt-8'  onSubmit={handleSubmit}>
          <div className='flex gap-3 items-end'>
             <div className='grow'>
        <label>{editedCategory ? "Update category": "New category name"}
          {editedCategory && ( <> : {editedCategory.name}</>)}  
        
        </label>
        <input 
        type='text' 
        value={newCategory}
        onChange={ev => Setnewcategory(ev.target.value)}
        />
             </div>
             <div className='pb-2 flex gap-1'>
              <button  type="submit"  className='border border-primary'>
                    {editedCategory ? "Update" :"Create"}
                
                </button>
                <button  type="button" onClick={()=>{
                  Seteditedcategory(null),
                  Setnewcategory("")
                  }}>
                  Cancel
                </button>
             </div>
          </div> 
    </form>
    <ul>
    <h2 className='mt-8  text-sm text-gray-500'>Existing category</h2>
      {categories?.length > 0 && categories.map(c =>(
        <div className=' bg-gray-100  rounded-xl p-2 flex gap-1  mb-2' 
          //  onClick={()=>{ 
          //   Seteditedcategory(c);
          //   Setnewcategory(c.name)
          // }}
        >
        <span className='text-gray-500'>edit category:</span>
        <div  className=' grow hover:underline cursor-pointer'> 
        {c.name}
        </div >
        <div className='flex gap-1'>
        <button type='button'   onClick={()=>{ 
            Seteditedcategory(c);
            Setnewcategory(c.name)
          }}>Edit</button>
        {/* <button 
        onClick={() => handledeleteclick(c._id)}
        type='button'>Delete</button> */}
        <Deletebutton  label="Delete"   onDelete={ ()=> handledeleteclick(c._id)} />
        </div>
        </div>
      )
      )}
    </ul>
    </section>
  )
}

export default page 