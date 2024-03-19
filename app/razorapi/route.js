import { NextResponse } from "next/server";
import {auth,db} from "../firebase_config";

export async function GET() {
  // const res = await fetch('https://data.mongodb-api.com/...', {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'API-Key': process.env.DATA_API_KEY,
  //   },
  // })
  // const data = await res.json()

  return NextResponse.json({ msg: "success" });
}




export async function POST(req) 
{

  const body = await req.json();  

  const user =auth.currentUser;
 

  if(user){
    return NextResponse.json({ msg: "User is here" });
  }

  else{
    return NextResponse.json({msg:"User is not defined"})
  }
  

  
}



