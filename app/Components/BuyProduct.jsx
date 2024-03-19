"use client";
import React, { Suspense, useState } from "react";
import Buy from "./Buy";
import { useRouter  } from 'next/navigation';
import Loading from "./Loading";
import {auth,db} from "../firebase_config";
import { addDoc,collection } from "firebase/firestore";

const BuyProduct = (props) => {


  const {product}= props;
  const router = useRouter()

  const user=auth.currentUser;
 
  const [u,setu]=useState(user);
  const makePayment = async ({ productId = null }) => {
   
  
 
    // "use server"
    const key = process.env.NEXT_PUBLIC_RAZORPAY_API_KEY;
    console.log(key);
    // Make API call to the serverless API

    
    const data = await fetch("http://localhost:3000/razorapi/razorpay",{
      method:"POST",
      body:JSON.stringify({
        name:product.name,
        price:product.price,
        docid:product.docid,
        userid:u.uid
      })
    });
    const {order } = await data.json();
    console.log(order.id);
    const options = {
      key: key,
      name: "vrinadava2op",
      currency: order.currency,
      amount: product.price,
      order_id: order.id,
      userId:order.userId,
      description: product.desc,
      // image: logoBase64,
      handler: async function (response) {
        // if (response.length==0) return <Loading/>;
        console.log(response);

        const data = await  fetch("http://localhost:3000/razorapi/paymentverify", {
          method: "POST",
          // headers: {
          //   "Content-Type": "application/json"
          //   // Authorization: 'YOUR_AUTH_HERE'
          // },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            user:user.uid,
          }),
        });



        const res = await data.json();

        console.log("response verify==",res)

        if(res?.message=="success")
        {

          const docRef = await addDoc(collection(db, 'payment'), {
            userId:user.uid,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });
        
          console.log("redirected.......")
          router.push("/paymentsuccess?paymentid="+response.razorpay_payment_id);

        }

        // Validate payment at server - using webhooks is a better idea.
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
      },
      prefill: {
        platform: "2opCommerce",
        email: `${u.email}`,
        userId:`${u.uid}`,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      alert("Payment failed. Please try again. Contact support for help");
    });
  };

  return (
    <>
    <Suspense fallback={<Loading/>}>
      <Buy makePayment={makePayment} />
      </Suspense>
    </>
  );
};

export default BuyProduct;