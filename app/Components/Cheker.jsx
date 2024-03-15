"use client";
import { useEffect } from "react";
import { auth } from "../firebase_config";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";




function Cheker() {

const router=useRouter();
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth, (user) => {
            if (!user) {
                    router.push('/login');
            } 
          });
          return ()=> unsubscribe();
    },[]);



    const logout=()=>{
        signOut(auth);
    }
  return (
 <>
 </>
  )
}

export default Cheker
