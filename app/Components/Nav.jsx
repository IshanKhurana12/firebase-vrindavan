"use client";
import React from "react";
import { FloatingNav } from "../Components/FloatingNav";
import { IconBrandProducthunt, IconBuilding, IconBuildingStore, IconHome, IconMessage, IconPhone, IconShoppingCart, IconUser } from "@tabler/icons-react";
export default function Nav() {
  const navItems = [
    {
      name: "Home",
      link: "/home",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Products",
      link: "/products",
      icon: <IconBuildingStore className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "/contact",
      icon: (
        <IconPhone className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    {
      name: "Cart",
      link: "/cart",
      icon: (
        <IconShoppingCart className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    }
  ];
  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
      <DummyContent />
    </div>
  );
}
const DummyContent = () => {
  return (
    
    <>
    </>
  );
};
