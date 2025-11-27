"use client";
import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useAppDispatch } from "@/redux/hooks";
import { closeCreateTask } from "@/redux/Uislice";
const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setdueDate] = useState("");

  const dispatch = useAppDispatch();
  const fetchTasks = async()=>{
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  } 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/createtask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          dueDate,
        }),
        credentials: "include",
      });
      const data = await res.json();
      fetchTasks()
      dispatch(closeCreateTask())
      console.log("Task created: ", data);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="relative w-[30vw] min-h-[40vh] border border-[#64ffda] rounded-xl p-6 shadow-xl">
      <h2 className="text-xl font-semibold text-[#64ffda] mb-4">
        Create New Task
      </h2>
      <button
        onClick={() => dispatch(closeCreateTask())}
        className="absolute top-5 right-5"
      >
        <FaXmark className="w-5 h-5 fill-white/30" />
      </button>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Task Title */}
        <input
          type="text"
          placeholder="Task title..."
          className="p-3 rounded-md bg-white/20 text-white placeholder-gray-400 outline-none border border-transparent focus:border-[#64ffda]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Task Description */}
        <textarea
          placeholder="Task description..."
          className="p-3 rounded-md bg-white/20 text-white placeholder-gray-400 outline-none h-32 border border-transparent focus:border-[#64ffda]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          value={dueDate}
          onChange={(e) => setdueDate(e.target.value)}
          className="bg-white/20 px-2 rounded-md text-gray-400 py-1"
          type="date"
    
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#64ffda] text-black font-semibold p-3 rounded-md hover:bg-[#52d7b9] transition-all"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
