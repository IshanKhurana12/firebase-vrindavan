"use client"

import {auth,db} from "../firebase_config";
import { useState,useEffect } from "react";
import { collection,getDocs } from "firebase/firestore";



export default function OrderPage() {

//fetch all orders 
const [data,setdata]=useState(null);
    


useEffect(()=>{
  const user=auth.currentUser;
    const fetchdata=async()=>{
     
       try{
        const querySnapshot = await getDocs(collection(db,"payment"));
        const arr=[];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          
          arr.push(doc.data());
        });
        //filter all orders 
      const finaldata= arr.filter((item)=>{
        return item.userId===user.uid;
       })
       console.log(finaldata);
       setdata(finaldata);
       }catch(err){
        console.log(err);
       }
    }

    fetchdata();
   
},[setdata]);


console.log(data);


  return (
    <div>
      {!data?<div>
        ...loading
      </div>:
      <div>
        {data.map((item)=>(
            <div class="container mx-auto py-8">
      
      <div class="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
       
          <div class="p-6">
              <div class="text-center">
                  <h1 class="text-xl font-bold text-gray-800 mb-2">Order Details</h1>
              </div>
             
              <div class="text-center mb-4">
                  <p class="text-gray-700 text-sm font-bold">Order ID: <span class="text-blue-500">{item.razorpay_order_id}</span></p>
                  <p class="text-gray-700 text-sm font-bold">Payment ID: <span class="text-blue-500">{item.razorpay_payment_id}</span></p>
              </div>
          </div>
       
          <div class="bg-gray-100 py-3 text-center text-sm text-gray-600">
              <p class="mb-2">Thank you for your order! For any inquiries, please contact <a href="#" class="text-blue-500">customer service</a>.</p>
          </div>
      </div>
  </div>
        ))}

        
        </div>}
    </div>
  )
}
