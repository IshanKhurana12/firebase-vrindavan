"use client"
import { useState } from "react";
import { useEffect } from "react";
import {auth} from "../firebase_config";
import axios from 'axios';
import { onAuthStateChanged } from "firebase/auth";
import "../css/allusers.css"
import "../css/loading.css";










export default function Alluser() {


//get curreent user
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

const [t,sett]=useState("");

// Verify ID token and check custom claim
async function isAdmin(idToken) {
    try {
        // Verify the ID token
        const decodedToken = await auth().verifyIdToken(idToken);
        
        // Check if the user has the 'admin' custom claim
        return decodedToken.admin === true;
    } catch (error) {
        console.error('Error verifying token:', error);
        return false;
    }
}
   async function gettoken(){
    try{
        const accessToken =await user.getIdToken();
        sett(accessToken);
        console.log(accessToken)
    }catch(err){
        console.log(err);
    }
    }

 





        const [users,setuser]=useState([]);

        useEffect(()=>{
          async function getuser(){
            try{
                const res=await axios.get("/api");
                
                setuser(res.data);
            }catch{
                console.log("some err occ");
            }
               
          } 

          getuser();
        },[])


        console.log(users);
       
        //createadmin
      async function handleclick(id){
        
        try{
          
            const token=await gettoken();
         
            const res = await axios.get(`/api/${id}`);
               
            console.log(res.data);
        }catch(err){
            console.log(err);
        }
      

       
       }

        
    if(user){
        return (
            <div>
            <h1 className="p-2 m-2">List of users</h1>
            {users && users.length > 0 ? (
              users.map((user) => (
               
                <div  key={user.uid} className="card">
  <div className="img"></div>
  <div className="textBox">
    <div className="textContent">
      <p className="h1">{user.email}</p>
      
    </div>
    <button onClick={()=>handleclick(user.uid)} className="button">Create Admin</button>
  <div>
</div></div></div>
                
              ))
            ) : (
              <div aria-label="Orange and tan hamster running in a metal wheel" role="img" className="wheel-and-hamster">
              <div className="wheel"></div>
              <div className="hamster">
                <div className="hamster__body">
                  <div className="hamster__head">
                    <div className="hamster__ear"></div>
                    <div className="hamster__eye"></div>
                    <div className="hamster__nose"></div>
                  </div>
                  <div className="hamster__limb hamster__limb--fr"></div>
                  <div className="hamster__limb hamster__limb--fl"></div>
                  <div className="hamster__limb hamster__limb--br"></div>
                  <div className="hamster__limb hamster__limb--bl"></div>
                  <div className="hamster__tail"></div>
                </div>
              </div>
              <div className="spoke"></div>
            </div>
            )}
          </div>
          )
    }
        
    
  
}

