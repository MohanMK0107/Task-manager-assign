"use client";
import { FaRegUser } from "react-icons/fa";
import { useAppDispatch } from "@/redux/hooks";
import { openCreateTask } from "@/redux/Uislice";
import { useSession } from "next-auth/react";

const UserProfile = () => {
    
  const dispatch = useAppDispatch();
  const {data:session , status} = useSession();
  console.log(session)
  if (status === "loading") {
    return <div className="text-white">Loading...</div>;
  }

  if (!session) {
    return <div className="text-white">You are not logged in.</div>;
  }
  return (
    <div className="w-full h-full flex flex-col items-center mt-20 gap-6">
      {/* Profile Icon */}
      <div className="w-32 h-32 border-2 border-white/40 rounded-full flex items-center justify-center backdrop-blur-xl bg-white/10 shadow-lg">
        <FaRegUser className="w-16 h-16 text-white/80" />
      </div>

      {/* User Info */}
      <div className="text-center text-white">
        <h3 className="text-xl font-semibold">{session.user?.name}</h3>
        <h3 className="text-sm text-white/70">{session.user?.email}</h3>
      </div>

      {/* Button */}
      <button
        onClick={() => dispatch(openCreateTask())}
        className="mt-4 px-6 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-lg shadow-md text-white font-medium transition-all duration-300"
      >
        Create a Task +
      </button>
    </div>
  );
};

export default UserProfile;
