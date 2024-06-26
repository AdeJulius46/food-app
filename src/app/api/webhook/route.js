
import { Order } from '@/app/models/Order';
const stripe = require('stripe')(process.env.STRIPE_SK);
export async function POST(req) {
  const sig = req.headers.get('stripe-signature');
  let event;

  try {
    const reqBuffer = await req.text();
    const signSecret = process.env.STRIPE_SIGNIN_SECRETE;
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
  } catch (e) {
    console.error('stripe error');
    // console.log(e);
    return Response.json(e, {status: 400});
  }


  // console.log(event)

  if (event.type === 'checkout.session.completed') {
    console.log(event)  
    console.log({"orderId":event?.data?.object?.metadata})
    const orderId = event?.data?.object?.metadata?.orderId;
    const isPaid = event?.data?.object?.payment_status === 'paid';
    if (isPaid) {
      await Order.updateOne({_id:orderId }, {paid:true});
    } 
  }
  

  return Response.json('ok', {status: 200});
}
