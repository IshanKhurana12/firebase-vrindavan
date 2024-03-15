"use client"
import { useState,useEffect } from "react";
import { auth } from "../firebase_config";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";



const Signup = () => {


    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const [user,setuser]=useState(null);
 const router=useRouter();


  


    const createAcc=(e)=>{

        e.preventDefault();
        const currentUser=auth.currentUser;
        if(currentUser){
         logout();
        }
     createUserWithEmailAndPassword(auth,email,password).then((userCredentials)=>{
        console.log("user Created");
            signOut(auth);
            setuser(null);
            router.push('/login');
     }).catch((err)=>{
        console.log(err);
     })
    }


    function logout() {
      
      signOut(auth)
          .then(() => {
              console.log("Logout");
              setuser(null);
              router.push("/");
          })
          .catch((err) => {
              console.error("Error signing out:", err);
          });
  }

  return (
<div>
  <div className="w-80 rounded-2xl bg-slate-900">
  <div className="flex flex-col gap-2 p-8">
    <p className="text-center text-3xl text-gray-300 mb-4">Register</p>
    <input  type="email" value={email} onChange={(e)=>setemail(e.target.value)} className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" placeholder="Email" />
    <input  type="password"  value={password} onChange={(e)=>setpassword(e.target.value)} className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" placeholder="Password" />

    <button className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95" type="submit" onClick={createAcc}>Register</button>
  </div>
</div>
</div>

  )
}

export default Signup
