// Import necessary modules and functions
import admin from "../admin_config";
import { NextResponse } from "next/server";


  


export async function GET(request,params){
    console.log(params.params.id);
    try {
        await admin.auth().setCustomUserClaims(params.params.id, { admin: true });
        console.log('Custom claim set successfully'); 
       return NextResponse.json({message:"admin bna dia"});
      } catch (error) {
        console.error('Error setting custom claim:', error);
       return NextResponse.json({message:"not an admin"});
      }
    
}

