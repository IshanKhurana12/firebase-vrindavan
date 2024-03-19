import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";
import crypto from "crypto";
import {db,auth} from "../../firebase_config";
import { addDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";

const instance = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
  key_secret: process.env.NEXT_PUBLIC_RAZORPAY_APT_SECRET,
});







 




export async function POST(req,res) {

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature ,user } =
  await req.json();
   const body = razorpay_order_id + "|" + razorpay_payment_id;
console.log("id==",body)

 const expectedSignature = crypto
   .createHmac("sha256", process.env.NEXT_PUBLIC_RAZORPAY_APT_SECRET)
   .update(body.toString())
   .digest("hex");

const isAuthentic = expectedSignature === razorpay_signature;


 if (isAuthentic) {

  
    console.log("user:" ,user);
  
 

  //  return NextResponse.redirect(new URL('/paymentsuccess', req.url));

} else {
    return NextResponse.json({
        message: "fail"
      }, {
        status: 400,
      })

}


return NextResponse.json({
    message: "success"
  }, {
    status: 200,
  })

}