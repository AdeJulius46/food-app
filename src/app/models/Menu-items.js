import mongoose, { model,models, Schema } from "mongoose";




const ExtraPriceSchema = new Schema({
    name:String,
    price:Number,
})
const MenuItemsSchema = new Schema({
    image:{type:String},
    name:{type:String},
    description:{type:String},
    category:{type:mongoose.Types.ObjectId}, 
    baseprice:{type:Number},
    sizes:{type:[ExtraPriceSchema]},
    extraingredientprices:{type:[ExtraPriceSchema]}
},{timestamps:true})


export const Menuitem = models?.Menuitem  || model("Menuitem",MenuItemsSchema)