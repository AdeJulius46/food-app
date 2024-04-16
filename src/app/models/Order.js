import {Schema, model, models} from "mongoose"

const OrderSchema = new Schema({
    userEmail:String,
    phone:String,
    streetAddress:String,
    city:String,
    country:String,
    paid:{type:Boolean, default:false},
    cartProduct:Object,

},{timestamps:true})

  export const  Order = models?.Order || model("Order",OrderSchema)