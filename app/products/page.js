
import { AuthCredential, signOut } from "firebase/auth";
import { auth } from "../firebase_config";
import Link from "next/link";
import Cheker from "../Components/Cheker";
import Userdetails from "../Components/Userdetails";
import Products from "../Components/Products";




function page() {
return(
  <div>
  <Cheker/>
  
  <Products/>
  <Link className="p-2 m-5" href={"/cart"}><button className="border flex  p-2">Go to cart</button></Link>
  
  </div>
)
}

export default page
