"use client"
import { useState } from "react";
import { auth, db } from "../firebase_config";
import { getDocs, query, collection, where, addDoc, updateDoc ,doc} from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function UserhtmlForm() {
   const [name, setName] = useState("");
   const [add, setAdd] = useState("");
   const [city, setCity] = useState("");
   const [state, setState] = useState("");
   const [zip, setZip] = useState("");
   const router=useRouter();

   async function handleSubmit(e) {
      e.preventDefault();

      const user = auth.currentUser;
      try {
         const querySnapshot = await getDocs(query(collection(db, 'user'), where('userId', '==', user.uid)));

         if (querySnapshot.empty) {
            await addDoc(collection(db, 'user'), {
               userId: user.uid,
               name: name,
               address: add,
               city: city,
               state: state,
               zip: zip
            });
            console.log("Document added successfully");
            alert("added");
            router.push("/user");
         } else {
            querySnapshot.forEach(async (docu) => {
               const docId = docu.id;
               await updateDoc(doc(db, 'user', docId), {
                  name: name,
                  address: add,
                  city: city,
                  state: state,
                  zip: zip
               });
               console.log('Document updated successfully');
               alert("updated");
               router.push("/user");
            });
         }
      } catch (err) {
         console.error(err);
      }
   }

   return (
      <div className="mt-40">
         <form onSubmit={handleSubmit}>
            <div className="mt-4 flex flex-col bg-gray-900 rounded-lg p-4 shadow-sm">
               <h2 className="text-white font-bold text-lg">User Details</h2>
               <div className="mt-4">
                  <label className="text-white" htmlFor="name">Name</label>
                  <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-2 py-1" type="text" required />
               </div>
               <div className="mt-4">
                  <label className="text-white" htmlFor="address">Address</label>
                  <textarea placeholder="Your address" value={add} onChange={(e) => setAdd(e.target.value)} className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-2 py-1" id="address" required></textarea>
               </div>
               <div className="mt-4 flex flex-row space-x-2">
                  <div className="flex-1">
                     <label className="text-white" htmlFor="city">City</label>
                     <input placeholder="Your city" value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-2 py-1" id="city" type="text" required />
                  </div>
                  <div className="flex-1">
                     <label className="text-white" htmlFor="state">State</label>
                     <input placeholder="Your state" value={state} onChange={(e) => setState(e.target.value)} className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-2 py-1" id="state" type="text" required />
                  </div>
               </div>
               <div className="mt-4 flex flex-row space-x-2">
                  <div className="flex-1">
                     <label className="text-white" htmlFor="zip">ZIP</label>
                     <input placeholder="Your ZIP code" value={zip} onChange={(e) => setZip(e.target.value)} className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-2 py-1" id="zip" type="text" required />
                  </div>
               </div>
               <div className="mt-4 flex justify-end">
               

                  
                  <button className="bg-white text-black rounded-md px-4 py-1 hover:bg-blue-500 hover:text-white transition-all duration-200" type="submit">Submit</button>
                  
               </div>
            </div>
         </form>
      </div>
   );
}
