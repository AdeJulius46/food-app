import mongoose from "mongoose"
import { User } from "@/app/models/User"



export async function GET(req){
mongoose.connect(process.env.MONGO_URL)
    const user = await  User.find();
    return Response.json(user)
}