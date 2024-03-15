"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";
import LampContainer from "../Components/LampContainer";

export function Content() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 150 }}
        whileInView={{ opacity: 1, y: 50 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
       Discover, Explore  <br /> Shop, Enjoy, Repeat
      </motion.h1>
    </LampContainer>
  );
}


