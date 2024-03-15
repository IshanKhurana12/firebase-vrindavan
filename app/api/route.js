
import admin from "./admin_config";
import { NextResponse } from "next/server";
export async function GET() {
    try {
      const listUsersResult = await admin.auth().listUsers();
      const users = listUsersResult.users.map(userRecord => userRecord.toJSON());
    return  NextResponse.json(users)
    } catch (error) {
      console.error('Error fetching users:', error);
      return NextResponse.json({error:error});
    }
  }


  //ab axios ka use krenge 