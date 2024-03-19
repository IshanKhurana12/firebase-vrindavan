"use client"
import { useState, useEffect } from "react";
import { db } from "../firebase_config";
import { collection, query, where, getDocs } from "firebase/firestore";
import BuyProduct from "./BuyProduct";
function Productinfo({ productName }) {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const q = query(collection(db, "products"), where("name", "==", productName));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    setProduct(doc.data());
                });
            } catch (error) {
                console.error("Error getting product:", error);
            }
        };

        getProduct();
    }, [productName]);

    const handleImageClick = (clickedImageUrl) => {
        const tempThumbnail = product.thumbnailUrl;
        setProduct({ ...product, thumbnailUrl: clickedImageUrl });
    };

    return (
        <div>
            <h1 className=" bg-white text-center text-black font-bold ">2opCommerce</h1>
            {product && (
              
                <div className="max-w-6xl mx-auto px-8 py-20 bg-black shadow-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="flex justify-center md:justify-end">
                            <img
                                src={product.thumbnailUrl}
                                alt={product.name}
                                className="w-full h-60 object-cover rounded-lg shadow-md cursor-pointer"
                            />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{productName}</h1>
                            <div className="grid grid-cols-4 gap-4 mb-6">
                                {product.imagesUrls.map((imageUrl, index) => (
                                    <div key={index} className="relative cursor-pointer">
                                        <img
                                            src={imageUrl}
                                            alt={product.name}
                                            className="w-full h-20 object-cover rounded-lg shadow-md"
                                            onClick={() => handleImageClick(imageUrl)}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div  className=" text-gray-200 text-lg mb-2">Price: <span className="text-green-600 font-semibold">${product.price}</span></div>
                           
                            <div className="text-gray-200 text-lg mb-6">Description: {product.desc}</div>
                            <div className="flex space-x-4">    
                               <BuyProduct product={product}/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Productinfo;
