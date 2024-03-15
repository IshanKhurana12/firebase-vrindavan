"use client"

import {auth,db} from "../firebase_config";
import "../css/spinner.css";
import { useState,useEffect } from "react";
import { collection,getDocs,deleteDoc,doc} from "firebase/firestore";
import { useRouter } from "next/navigation";


export default function Cart() {
    const [data,setdata]=useState(null);
    


    useEffect(()=>{
      const user=auth.currentUser;
        const fetchdata=async()=>{
         
           try{
            const querySnapshot = await getDocs(collection(db,"cart"));
            const arr=[];
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              
              arr.push(doc.data());
            });
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

    async function del(docid){
      console.log(docid);
      const docRef = doc(db, 'cart', docid)
      try{
        await deleteDoc(docRef);
        console.log("deleted");
        const update=data.filter((item)=>{
          return item.docid!=docid;
        })
        setdata(update)
      }catch(err){
        console.log(err);
      }
     
    }
    const router=useRouter();
    const handlenavi=(itemname)=>{
        router.push(`/products/${itemname}`);
    }

  return (
    <div>
        {!data?<div className="flex justify-center"><div className="spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      </div>
      </div>:
        <div className="flex flex-wrap p-5 m-5 justify-center">
          {data.map((item,id)=>(
            <div  key={id} className="flex flex-col m-10 bg-white w-72 h-48 rounded-md py-4 px-6 border">
            <h3 className="text-center font-bold text-xl text-gray-800 pb-2">₨-{item.price}</h3>
            <h3 className="text-base font-semibold text-gray-900">{item.name}</h3>
            <p className="text-sm text-gray-500 pb-3">{item.desc}</p>
            <img onClick={()=>handlenavi(item.name)}
                                src={item.thumbnailUrl}
                                alt={item.name}
                                className="w-10 h-20 object-cover rounded-lg shadow-md cursor-pointer"
                            />
            <div className="flex justify-around items-center py-3">
              
                <div className="flex gap-2 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer">
                  <svg className="w-6 stroke-red-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokelionjoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                  <button onClick={()=>del(item.docid)} className="font-semibold text-sm text-red-700">Delete</button>
                </div>
            </div>
          </div>
          ))}
          </div>
        
        
        }
    </div>
  )
}
