import {  NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";

const instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
    key_secret: process.env.NEXT_PUBLIC_RAZORPAY_APT_SECRET,
  });


  export async function POST(req,res) {
    const { price,name,docid,userid } =
    await req.json();
    const payment_capture = 1;
    const amount = price * 100 // amount in paisa. In our case it's INR 1
    const currency = "INR";
    const options = {
        amount: (amount).toString(),
        currency,
        receipt: shortid.generate(),
        payment_capture,
        notes: {
            // These notes will be added to your transaction. So you can search it within their dashboard.
            // Also, it's included in webhooks as well. So you can automate it.
            paymentFor:name,
            userId: userid,
            productId: docid
        }
    };

   const order = await instance.orders.create(options);//razorpay mai order create ho rha hai
  return NextResponse.json({ msg: "success",order });
    }

