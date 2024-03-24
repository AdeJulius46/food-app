// import { authOptions } from "../auth/[...nextauth]/route";
// import { User } from "@/app/models/User";
// import { UserInfo } from "@/app/models/Userinfo";
// import mongoose from "mongoose";
// import { getServerSession } from "next-auth";

//  export async function PUT(req){
//     mongoose.connect(process.env.MONGO_URL)
//     const  data = await req.json()
//     const {_id, name, image, ...otheruser}= data


//     if(_id){
//       await  User.updateOne({_id}, {name,image})
//       await UserInfo.findOneAndUpdate({_id}, otheruser, {upsert:true});
//     }else{
//       const session = await getServerSession(authOptions)
//       // const email= session.user.email 
//       const email= session.user.email 
      
//       // const user = await User.findOne({_id,email})
//       await  User.updateOne({email}, {name,image})
//       await UserInfo.findOneAndUpdate({email}, otheruser, {upsert:true});
//       // await UserInfo.findOneAndUpdate({email:user.email}, otheruser, {upsert:true});

//     }


//     // const user = await Use r.findOne({email})
     
//     // const update = {}
//     // if("name" in data){
//     //   update.name= data.name
//     // }

//     // if("image" in data){
//     //   update.image=data.image
//     // }

//     // if(  Object.keys(update).length > 0){
//     //   await  User.updateOne({email}, update)

//     // }
 


// return Response.json(true)
//  }
 

//   export async function GET(){
//     mongoose.connect(process.env.MONGO_URL);
//     const session = await getServerSession(authOptions)
//     const email = session?.user?.email
//       if(!email){
//         return Response.json({})
//       }
//        const user = await User.findOne({email}).lean()
//        const userinfo = await UserInfo.findOne({email}).lean()
//     return Response.json({...user, ...userinfo})

  // export async function GET(req){

    // mongoose.connect(process.env.MONGO_URL);
    // const url =new URL(req.url)
    // const _id =  url.searchParams.get("_id")
    // let filter ={_id}; 
    // if(_id){
    //   filter ={_id}
      //  const user = await User.findOne({_id}).lean()
      //  const userinfo = await UserInfo.findOne({email:user.email}).lean()
       
      // } else{

      // const session = await getServerSession(authOptions)
      // const email = session?.user?.email
      //   if(!email){
      //     return Response.json({})
      //   } 
      //   filter ={email};

        // return Response.json({...user, ...userinfo})
    // }


    //    const user = await User.findOne(filter).lean()
    //    const userinfo = await UserInfo.findOne({email:user.email}).lean()
    // return Response.json({...user, ...userinfo})
  // } 


  // import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import { authOptions } from "../auth/[...nextauth]/route";

// import {User} from "@/models/User";
// import {UserInfo} from "@/models/UserInfo"

import { User } from "@/app/models/User";
import { UserInfo } from "@/app/models/Userinfo";
import mongoose from "mongoose";
import {getServerSession} from "next-auth";

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const {_id, name, image, ...otherUserInfo} = data;

  let filter = {};
  if (_id) {
    filter = {_id};
  } else {
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    filter = {email};
  }

  const user = await User.findOne(filter);
  await User.updateOne(filter, {name, image});
  await UserInfo.findOneAndUpdate({email:user.email}, otherUserInfo, {upsert:true});

  return Response.json(true);
}

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);

  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');

  let filterUser = {};
  if (_id) {
    filterUser = {_id};
  } else {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) {
      return Response.json({});
    }
    filterUser = {email};
  }

  const user = await User.findOne(filterUser).lean();
  const userInfo = await UserInfo.findOne({email:user.email}).lean();

  return Response.json({...user, ...userInfo});

}