import mongoose from "mongoose"
import { User } from "@/app/models/User"
import { isAdmin } from "../auth/[...nextauth]/route";


export async function GET(req){
mongoose.connect(process.env.MONGO_URL)
if(await isAdmin()){
    const user = await  User.find();
    return Response.json(user)
}else{
    return Response.json({})
}

}