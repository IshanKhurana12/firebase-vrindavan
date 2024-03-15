"use client";
import  Mask  from "../Components/Mask";

export default function Realmask() {
    return (
      <div className="h-[40rem] w-full flex items-center justify-center  overflow-hidden">
        <Mask
          revealText={
            <p className="max-w-4xl mx-auto text-slate-100 text-center  text-4xl font-bold">
Crafting elegance, one click at a time –
            </p>
          }
          className="h-[40rem] "
        >
           <span className="text-purple-500"></span> 
           where style meets convenience.
         <span className="text-red-500">   2opCommerce</span>.
        </Mask>
      </div>
    );
  }
