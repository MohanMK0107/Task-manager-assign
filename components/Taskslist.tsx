"use client";
import React, { useEffect, useState } from "react";
import { LuArrowUpDown } from "react-icons/lu";
import { VscSettings } from "react-icons/vsc";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";

function Taskslist() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const [search, setSearch] = useState("");

  const [filterState, setFilterState] = useState(false);
  const [sortState, setSortstate] = useState(false);

  // Update input fields
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedDueDate, setUpdatedDueDate] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState("Pending");

  // Sort & Filter state
  const [sortBy, setSortBy] = useState<"oldest" | "newest" | "Due date">(
    "newest"
  );
  const [filterStatus, setFilterStatus] = useState<
    "All" | "Pending" | "In Progress" | "Completed"
  >("All");

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data.tasks || []);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 🗑 DELETE
  const deleteTask = async (id: string) => {
    try {
      const res = await fetch(`/api/tasks/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Failed to delete");
      fetchTasks();
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  const startEditTask = (task: any) => {
    setEditingTaskId(task.id);
    setUpdatedTitle(task.title);
    setUpdatedDescription(task.description);
    setUpdatedDueDate(task.dueDate?.split("T")[0] || "");
    setUpdatedStatus(task.status);
  };

  const updateTask = async (id: string) => {
    try {
      const res = await fetch(`/api/tasks/update`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          title: updatedTitle,
          description: updatedDescription,
          dueDate: updatedDueDate,
          status: updatedStatus,
        }),
      });

      if (!res.ok) throw new Error("Failed to update");

      setEditingTaskId(null);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredTasks = tasks
    .filter((task) =>
      filterStatus === "All" ? true : task.status === filterStatus
    )
    .filter((task) => {
      if (search.trim() === "") return true;
      const s = search.toLowerCase();
      return (
        task.title.toLowerCase().includes(s) ||
        task.description.toLowerCase().includes(s)
      );
    })
    .sort((a, b) => {
      const s = search.toLowerCase();

      const aMatch =
        a.title.toLowerCase().includes(s) ||
        a.description.toLowerCase().includes(s);
      const bMatch =
        b.title.toLowerCase().includes(s) ||
        b.description.toLowerCase().includes(s);

      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;

      if (sortBy === "newest") {
        return (
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
        );
      }

      if (sortBy === "Due date") {
        const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
        const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
        return dateA - dateB;
      }

      return (
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    });

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col items-center px-8 py-6">
      <h1 className="f-inter text-2xl font-semibold text-white mb-4 tracking-wide">
        Your Tasks
      </h1>

      <div className="relative flex items-center justify-between gap-2 w-full h-auto mb-6 py-2 px-4 ">
        {/* Filter */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setFilterState((prev) => !prev)}
            className={`flex items-center gap-2 backdrop-blur-md bg-white/50 text-white px-4 py-2 rounded-xl shadow-lg hover:bg-white/20 transition-all duration-300 f-poppins text-sm cursor-pointer`}
          >
            <VscSettings className="text-lg h-5 w-5" />
          </button>
          <div className=" text-white f-poppins font-semibold px-2 py-1">
            {filterStatus}
          </div>
        </div>

        {/* SEARCH */}
        <div className="backdrop-blur-xl bg-white/10 flex items-center px-2 rounded-full shadow-2xl">
          <button className="text-white">
            <IoSearch className="w-5 h-5" />
          </button>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="focus:outline-none focus:ring-none px-2 py-1 f-poppins font-semibold text-gray-200"
            type="search"
            placeholder="Search..."
          />
        </div>

        {/* Sort */}
        <div className="relative flex items-center">
          <button
            onClick={() => setSortstate((prev) => !prev)}
            className="text-white f-inter bg-white/50 p-1 rounded-lg cursor-pointer"
          >
            <LuArrowUpDown className="w-5 h-5" />
          </button>

          <div className="text-white f-poppins font-semibold px-2 py-1">
            {sortBy}
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="flex flex-col w-full gap-4">
        {tasks.length > 0 ?
        <>
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-md hover:bg-white/20 transition-all duration-300"
          >
            {editingTaskId === task.id ? (
              <div className="flex flex-col gap-2">
                <input
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                  className="p-2 rounded-md text-black"
                  placeholder="Title"
                />
                <textarea
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                  className="p-2 rounded-md text-black"
                  placeholder="Description"
                />
                <input
                  type="date"
                  value={updatedDueDate}
                  onChange={(e) => setUpdatedDueDate(e.target.value)}
                  className="p-2 rounded-md text-black"
                />
                <select
                  value={updatedStatus}
                  onChange={(e) => setUpdatedStatus(e.target.value)}
                  className="p-2 rounded-md text-black"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => updateTask(task.id)}
                    className="bg-[#64ffda] text-black px-4 py-2 rounded-md"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingTaskId(null)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-white font-semibold text-lg">
                    {task.title}
                  </h2>
                  <p className="text-white text-sm">
                    {new Date(task.createdAt).toISOString().split("T")[0]}
                  </p>
                </div>
                <p className="text-white/70 mt-1">{task.description}</p>
                <div className="flex items-center justify-end gap-3 mt-3">
                  <p className="text-white text-sm">
                    {task.dueDate
                      ? new Date(task.dueDate).toISOString().split("T")[0]
                      : ""}
                  </p>
                  <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-lg">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        task.status === "Pending"
                          ? "bg-red-500"
                          : task.status === "In Progress"
                          ? "bg-amber-400"
                          : "bg-emerald-500"
                      }`}
                    />
                    <span className="text-xs text-white/60">{task.status}</span>
                  </div>
                  <AiOutlineEdit
                    onClick={() => startEditTask(task)}
                    className="text-white cursor-pointer"
                  />
                  <AiOutlineDelete
                    onClick={() => deleteTask(task.id)}
                    className="text-red-500 cursor-pointer"
                  />
                </div>
              </>
            )}
          </div>
        ))} </>:
        <div className="text-4xl f-poppins font-semibold text-white/30 w-full h-full flex justify-center items-center">Add new tasks</div>
        }
      </div>
    </div>
  );
}

export default Taskslist;
