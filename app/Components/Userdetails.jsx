
"use client"
import { useState,useEffect } from "react"
import {auth} from "../firebase_config";
import { onAuthStateChanged } from "firebase/auth";
import "../css/circleloader.css";
 function  Userdetails() {

    const[user,setUser]=useState(null);


    useEffect(()=>{
      // Listen for authentication state changes
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          // User is signed in
          setUser(user);
        } else {
          // User is signed out
          setUser(null);
        }
      });
  
      // Clean up subscription on unmount
      return () => unsubscribe();
    }, []);


   


  return (
    <div>
      {user?<div>
            <h1 className=" p-1">user-{user.email}</h1>
            
      </div>:
      <div className="loader">
      <div className="bar1"></div>
      <div className="bar2"></div>
      <div className="bar3"></div>
      <div className="bar4"></div>
      <div className="bar5"></div>
      <div className="bar6"></div>
      <div className="bar7"></div>
      <div className="bar8"></div>
      <div className="bar9"></div>
      <div className="bar10"></div>
      <div className="bar11"></div>
      <div className="bar12"></div>
  </div>}
    </div>
  )
}

export default Userdetails;
