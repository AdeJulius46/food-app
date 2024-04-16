import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import {Order} from "@/app/models/Order"
import { Menuitem } from "@/app/models/Menu-items";

const stripe = require('stripe')(process.env.STRIPE_SK)

export async function POST(req){
mongoose.connect(process.env.MONGO_URL)   
const {cartProduct,addres}= await req.json()
// console.log(req.headers)

const session = await getServerSession(authOptions)
const userEmail = session?.user?.email;
   const OrderDoc = await Order.create({
    userEmail,
    ...addres,
    cartProduct,
    paid:false
 })  

 const stripeLineItems=[];
for(const  cartProducts of cartProduct){
    let productInfo = await Menuitem.findById(cartProducts._id);
    let productPrice=productInfo.baseprice
    if (cartProducts.size){
        const size = productInfo.sizes.find(size => size._id.toString() === cartProducts.size._id.toString());
        productPrice += size.price
    }

    if(cartProducts.extra?.length > 0){
          for (const cartProductExtrathing of cartProducts.extra) {
            const productExtras =productInfo.extraingredientprices
            // console.log(productExtras)
                const extrathingInfo = productExtras.find(extra => extra._id.toString() === cartProductExtrathing._id.toString());
                 productPrice += extrathingInfo.price 
              } 
            }
            
            
            const productName = cartProducts.name;
    // const productName = cartProduct.name
           
    stripeLineItems.push({
        quantity:1,
        price_data:{
            currency:"USD",
            product_data:{
                name:productName
            },
            unit_amount:productPrice*100
        }
    })

}

// console.log({stripeLineItems});
// return  Response.json(null)



const stripeSession = await stripe.checkout.sessions.create({
  line_items: stripeLineItems,
  mode: 'payment',
  customer_email: userEmail,
  success_url: process.env.NEXTAUTH_URL + 'orders/' + OrderDoc._id.toString() + '?clear-cart=1',
  cancel_url: process.env.NEXTAUTH_URL + 'cart?canceled=1',
  metadata: {orderId:OrderDoc._id.toString()},
  payment_intent_data: {
    metadata:{orderId:OrderDoc._id.toString()},
  },
  shipping_options: [
    {
      shipping_rate_data: {
        display_name: 'Delivery fee',
        type: 'fixed_amount',
        fixed_amount: {amount: 500, currency: 'USD'},
      },
    }
  ],
});

 return  Response.json(stripeSession.url)
}



  