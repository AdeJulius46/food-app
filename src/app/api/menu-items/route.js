 import { Menuitem } from "@/app/models/Menu-items"
import mongoose from "mongoose"
import { isAdmin } from "../auth/[...nextauth]/route"
 export  async function POST(req){
    mongoose.connect(process.env.MONGO_URL)
    const data = await req.json()
if(await isAdmin()){
   const menu = await Menuitem.create(data)
   return Response.json(menu)

} else{

  return  Response.json({})
}

 }



 export async function PUT(req){ 
    mongoose.connect(process.env.MONGO_URL)
    const {_id, ...data} = await req.json()
      await Menuitem.findByIdAndUpdate(_id ,data)
      return Response.json(true)
 }
export  async function GET(){
   mongoose.connect(process.env.MONGO_URL)
      return Response.json(
         await Menuitem.find()
      )  
      

}

export async function DELETE(req){
   mongoose.connect(process.env.MONGO_URL)
    const url = new URL(req.url);
    const _id = url.searchParams.get("_id")
    if(await isAdmin()){
       await Menuitem.deleteOne({_id})
      }
      return Response.json(true)

   
 }



