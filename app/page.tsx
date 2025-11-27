"use client"
import CreateTask from "@/components/CreateTask";
import Navbar from "@/components/Navbar";
import UserProfile from "@/components/UserProfile";

import { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import Taskslist from "@/components/Taskslist";

export default function Home() {
  const isOpen = useAppSelector((state)=>state.ui.isCreateTaskOpen) 
  return (
    <div className="w-full h-full p-2 overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full h-auto">
        <Navbar />
      </div>
      <div className="fixed top-17 left-1 grid grid-cols-[30%_70%] gap-x-5  w-full h-full">
        <div className=" h-full w-full">
          <UserProfile />
        </div>
        <div className="h-full w-full">
          <Taskslist />
        </div>
      </div>
      {isOpen && 
      <div className="w-full h-full fixed bg-black/90 z-10 flex justify-center items-center">
        <CreateTask />
      </div>}
    </div>
  );
}
