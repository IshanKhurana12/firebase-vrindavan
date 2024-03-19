"use client"
import React,{useState} from "react";

const Buy = ({ makePayment }) => {

  const [isLoading, setIsLoading] = useState(false);



  return (
    <div className="flex flex-col items-center justify-center mt-[100px]">


<button
     onClick={() => {
          makePayment({ productId: "example_ebook" });
        }}
      disabled={isLoading}
      className={`bg-blue-500 text-white font-semibold  py-2 px-4 rounded ${
        isLoading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {isLoading ? 'Processing...' : 'Buy Now'}
    </button>



    </div>
  );
};

export default Buy;