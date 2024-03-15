"use client"
import { useState } from "react";


export default function CartButton({ productId }) {
    const [isAdded, setIsAdded] = useState(false);
  
    const handleClick = () => {
      // Perform your cart addition logic here
      // For demonstration purposes, just toggle the state
      setIsAdded(true);
    };
  
    return (
      <button
        onClick={handleClick}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
          isAdded ? 'cursor-not-allowed opacity-50' : ''
        }`}
        disabled={isAdded}
      >
        {isAdded ? 'Added to Cart' : 'Add to Cart'}
      </button>
    );
  }