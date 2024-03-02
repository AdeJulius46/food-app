// import   bcrypt  from  'bcryptjs';
// import { Schema, models, model } from "mongoose"


// const UserSchema = new Schema({
//     email:{type:String, required:true, unique:true },
//     password: {
//     type: String,
//     required: true,
//      validate:(pass) => {
//      if(!pass?.length || pass.length < 5){
//     new Error("password must be at least 5 characters ");
//     return false 
//          }  
//       },
//     },
// }, {timestamps: true });


// UserSchema.post("validate", function(user){
//     const UnhashedPass = user.password
//     const salt = bcrypt.genSaltSync(10);
//   user.password =(UnhashedPass,salt)
// })


// export const User = models?.User || model("User", UserSchema)

import {model, models, Schema} from "mongoose";

const UserSchema = new Schema({
  name: {type: String},
  email: {type: String, required: true, unique: true},
  password: {type: String},
  image: {type: String},
  phone:{type:String},
  streetAddress:{type:String},
  city:{type:String},
  country:{type:String},
  postalcode:{type:String},
  admin:{type:Boolean, default:false},
}, {timestamps: true});

export const User = models?.User || model('User', UserSchema);
