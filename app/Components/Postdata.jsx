"use client"
import { useState } from "react";
import { db, storage } from "../firebase_config";
import { collection, addDoc, updateDoc } from "firebase/firestore";
import { ref } from "firebase/storage";
import { uploadBytes,getDownloadURL } from "firebase/storage";
import Link from "next/link";

function Postdata() {
    const [namee, setName] = useState("");
    const [price, setPrice] = useState(0);
 const[loading,setloading]=useState(false);
    const [desc, setDesc] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [images, setImages] = useState([]);

    const handleThumbnailChange = (e) => {
        setThumbnail(e.target.files[0]);
    };

    const handleImagesChange = (e) => {
        setImages(Array.from(e.target.files));
    };

    const handlesubmit = async (event) => {
        event.preventDefault();
        try {
            if (!thumbnail) {
                console.error("Please select a thumbnail image.");
                return;
            }

            // Upload thumbnail to storage
            const thumbnailRef = ref(storage, thumbnail.name);
            await uploadBytes(thumbnailRef, thumbnail);
            const thumbnailUrl = await getDownloadURL(thumbnailRef);
            

            // Upload images to storage
            const imagesUrls = [];
            for (const image of images) {
                const imageRef = ref(storage, image.name);
                await uploadBytes(imageRef, image);
                const imageUrl = await getDownloadURL(imageRef);
                imagesUrls.push(imageUrl);
            }
            

            // Add product data to Firestore
           const docRef=await addDoc(collection(db, "products"), {
                name: namee,
                price: parseFloat(price),
                desc: desc,
                thumbnailUrl: thumbnailUrl,
                imagesUrls: imagesUrls,
            });
            const id=docRef.id;
           
          const addid={
            docid:id
          }
          await updateDoc(docRef, addid);

            console.log("Product added successfully!");
            setloading(true);

        } catch (err) {
            console.error("Error adding product:", err);
        }
    };

    

    return (
        <div>
            {!loading?  <form onSubmit={handlesubmit}>
                <input className="text-black m-5" type="text" placeholder="Enter name of the product" value={namee} onChange={(e) => setName(e.target.value)} required />
                <input className="text-black m-5" type="text" placeholder="Enter description of the product" value={desc} onChange={(e) => setDesc(e.target.value)} required />
                <input className="text-black m-5" type="text" placeholder="Enter price of the product" value={price} onChange={(e) => setPrice(e.target.value)} required />
                <input className="text-black m-5" type="file" onChange={handleThumbnailChange} required />
                <input className="text-black m-5" type="file" multiple onChange={handleImagesChange} required />
                <button className="border" type="submit">Add Product</button>
            </form>:
           
            <div className="flex flex-wrap">
                 <h1>Product Added Successfully</h1>
                <Link className="border m-5 p-2" href={"/products"}> Go back to Products Page</Link>
                <Link className="border m-5 p-2" href={"/admin"}> Go back to Admin Page</Link>
                <Link className="border m-5 p-2" href={"/addproduct"}> Add another Product</Link>
            </div>
            }
          
        </div>
    );
}

export default Postdata;
