"use client";
import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { IoSearch } from "react-icons/io5";
import { signOut } from "next-auth/react";
const Navbar = () => {
  return (
    <div
      className="
      w-full 
      h-16 
      flex items-center justify-between 
      px-8
      text-white
    "
    >
      <h1 className="font-semibold text-lg f-inter">Post Now</h1>
      
      <div onClick={()=>signOut({callbackUrl:'/Auth'})} className="flex items-center gap-8">
        <TbLogout className="w-6 h-6 hover:scale-115 transition-transform duration-300 cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
