// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import 'dotenv/config'
import { getAuth,setPersistence,browserLocalPersistence} from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional




const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId:process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket:process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId:process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId:process.env.NEXT_PUBLIC_APP_ID,
  measurementId:process.env.NEXT_PUBLIC_MEASUREMENT_ID
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const storage=getStorage(app);
 export const db=getFirestore(app);

 const auth = getAuth(app);

//enabling local persistance so that the auth.cuirrent user does not become null on page refreshes
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Local persistence enabled");
  })
  .catch((error) => {
    console.error("Error enabling local persistence:", error);
  });

 

  export {auth,storage}

