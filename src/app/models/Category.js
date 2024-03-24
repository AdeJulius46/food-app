import { Schema,model,models} from "mongoose";


const CategorySchema = new Schema({
name:{type:String, required:true},
},{timestamps: true})

// export const User = models?.User || model('User', UserSchema);
export  const  Category = models?.Category || model("Category",CategorySchema)