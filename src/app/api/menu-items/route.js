 import { Menuitem } from "@/app/models/Menu-items"
import mongoose from "mongoose"
 export  async function POST(req){

    const data = await req.json()
    mongoose.connect(process.env.MONGO_URL)
     const menu = await Menuitem.create(data)
     return Response.json(menu)

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
    await Menuitem.deleteOne({_id})
    return Response.json(true)
   
 }



