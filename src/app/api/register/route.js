import { User } from "../../../app/models/User"
import mongoose from "mongoose"

export  async function  POST(req){
    const body = await req.json();
    mongoose.connect("mongodb://127.0.0.1:27017/food")
    const createdUser = await User.create(body)
    return Response.json(createdUser)
 
}  
 

