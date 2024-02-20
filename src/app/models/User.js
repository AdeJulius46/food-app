import   bcrypt  from  'bcryptjs';
import { Schema, models, model } from "mongoose"


const UserSchema = new Schema({
    email:{type:String, required:true, unique:true },
    password: {
    type: String,
    required: true,
     validate:(pass) => {
     if(!pass?.length || pass.length < 5){
    new Error("password must be at least 5 characters ");
    return false 
         }  
      },
    },
}, {timestamps: true });


UserSchema.post("validate", function(user){
    // const UnhashedPass = user.password 
    // const  salt = bcrypt.genSaltSync(10);
    // const  hashedpass = bcrypt.hashSync(UnhashedPass, salt);

    const UnhashedPass = user.password
    const salt = bcrypt.genSaltSync(10);
  user.password =(UnhashedPass,salt)
})


export const User = models?.User || model("User", UserSchema)
