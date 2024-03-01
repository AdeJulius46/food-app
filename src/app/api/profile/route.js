import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/app/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

 export async function PUT(req){
    mongoose.connect(process.env.MONGO_URL)
    const  data = await req.json()
    const session = await getServerSession(authOptions)
    const email= session.user.email 
    // const user = await Use r.findOne({email})
     
    const update = {}
    if("name" in data){
      update.name= data.name
    }

    if("image" in data){
      update.image=data.image
    }

    if(  Object.keys(update).length > 0){
      await  User.updateOne({email}, update)

    }


return Response.json(true)
 }