"use client"
import { useEffect, useState } from "react"
import {auth} from "../firebase_config";
import { db } from "../firebase_config";
import { getDocs,collection } from "firebase/firestore";


export default function Userformdetails() {
    const [data,setdata]=useState(null);


   

    useEffect(()=>{
        const fetchdata=async()=>{
           try{
            const user= auth.currentUser;
            const querySnapshot = await getDocs(collection(db,"user"));
            const arr=[];
            querySnapshot.forEach((doc) => {
              arr.push(doc.data());
            });
          const finaldata= arr.filter((item)=>{
            return item.userId===user.uid;
           })
           
           setdata(finaldata);

           }catch(err){
            console.log(err);
           }
        }

        fetchdata();
       
    },[]);

    console.log(data);
   

  return (
    <div>
      {data?
      <div>
        {data.map((us,id)=>(
            <div key={id}>
            <h1>Name- {us.name}</h1>
            <h1>Address- {us.address}</h1>
            <h1>City- {us.city}</h1>
            <h1>Zip- {us.zip}</h1>
            <h1>State- {us.state}</h1>
            </div>
        ))}
        </div>:
        <div>Add User Details First</div>}
    </div>
  )
}
