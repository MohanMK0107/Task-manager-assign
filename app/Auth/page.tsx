"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
const Page = () => {
  const [state, setState] = useState<"Sign In" | "Sign Up">("Sign In");

  const [emailFocus, setEmailFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const updateField = (
    key: "email" | "username" | "password",
    value: string
  ) => {
    if (key === "email") setEmail(value);
    if (key === "username") setUsername(value);
    if (key === "password") setPassword(value);
  };
  const [showPass, setShowpass] = useState(false);

  const [Loading, setLoading] = useState(false);

  const HandleUserAction =async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    if(state === "Sign Up"){
      try {
        const res = await fetch('/api/signup',{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify({
            email,
            password,
            username
          })
        })
        const data = await res.json();
        if(!res.ok) throw new Error(data.error || "Sign Up failed");
        console.log(data)
        await signIn('credentials',{
          email,
          password,
          callbackUrl:'/'
        });


      } catch (error:any) {
        console.error(error)
      } finally{
        setLoading(false)
      }
    }else {
      try {
        await signIn("credentials", {
          email,
          password,
          callbackUrl: "/",
        });
      } catch (err: any) {
        console.error(err);
        alert(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const router = useRouter();

  return (
    <div className="w-screen h-screen flex justify-center items-center text-white">
      {/* Form */}
      <div className="w-full h-auto flex items-center justify-center p-4 ">
        <div className="flex flex-col px-8 gap-4 w-auto h-auto border p-8 rounded-3xl border-white/50 ">
          <h1 className="text-white f-inter text-xl">
            {state} to your Account
          </h1>
          {/*username*/}
          {state === "Sign Up" ? (
            <div
              onClick={() => setNameFocus(true)}
              className="border border-white p-2 rounded-lg relative"
            >
              <input
                onChange={(e) => updateField("username", e.target.value)}
                value={username}
                onFocus={() => setNameFocus(true)}
                onBlur={(e) => setNameFocus(e.target.value !== "")}
                className="focus:outline-none text-slate-300 bg-transparent px-2 py-1 font-semibold w-full"
                placeholder={`${nameFocus ? "Enter your User Name" : ""}`}
                type="text"
              />

              <p
                className={`f-poppins absolute text-gray-400 font-medium top-2 left-3 transition-all duration-300 ${
                  nameFocus
                    ? "-translate-y-5 text-[12px] bg-black px-1"
                    : "text-[14px]"
                }`}
              >
                User Name*
              </p>
            </div>
          ) : (
            ""
          )}
          {/* Email */}
          <div
            onClick={() => setEmailFocus(true)}
            className="border border-white p-2 rounded-lg relative"
          >
            <input
              onChange={(e) => updateField("email", e.target.value)}
              value={email}
              onFocus={() => setEmailFocus(true)}
              onBlur={(e) => setEmailFocus(e.target.value !== "")}
              className="focus:outline-none text-slate-300 bg-transparent px-2 py-1 font-semibold w-full"
              type="text"
              placeholder={`${emailFocus ? "Enter your email" : ""}`}
            />

            <p
              className={`f-poppins absolute text-gray-400 font-medium top-2 left-3 transition-all duration-300 ${
                emailFocus
                  ? "-translate-y-5 text-[12px] bg-black px-1"
                  : "text-[14px]"
              }`}
            >
              Email*
            </p>
          </div>

          {/* Password */}
          <div
            onClick={() => setPassFocus(true)}
            className="border border-white p-2 rounded-lg relative"
          >
            <input
              onChange={(e) => updateField("password", e.target.value)}
              value={password}
              onFocus={() => setPassFocus(true)}
              onBlur={(e) => setPassFocus(e.target.value !== "")}
              className="focus:outline-none text-slate-300 bg-transparent px-2 py-1 font-semibold w-full"
              type={showPass ? "text" : "password"}
            />

            <p
              className={`f-poppins absolute text-gray-400 font-medium top-2 left-3 transition-all duration-300 ${
                passFocus
                  ? "-translate-y-5 text-[12px] bg-black px-1"
                  : "text-[14px]"
              }`}
            >
              Password*
            </p>

            <button
              type="button"
              onClick={() => setShowpass(!showPass)}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {showPass ? (
                <FaEye className="fill-white w-5 h-5" />
              ) : (
                <FaEyeSlash className="fill-white w-5 h-5" />
              )}
            </button>
          </div>

          {/* Login Button */}
          <button
            onClick={HandleUserAction}
            className="mt-4 w-full py-2 bg-white f-inter font-semibold text-black rounded-md cursor-pointer transition-colors duration-300 hover:bg-blue-500 hover:text-white"
          >
            {state}
          </button>

          <div className="flex items-center gap-2">
            <p className="text-sm f-poppins font-semibold">
              Don't have an Account ?
            </p>
            <button
              onClick={(prev) =>
                setState(state === "Sign In" ? "Sign Up" : "Sign In")
              }
              className="cursor-pointer hover:underline text-sm font-semibold text-blue-500"
            >
              {state === "Sign In" ? "Sign Up" : "Sign In"}
            </button>
          </div>
          <div className="flex flex-col justify-center gap-4">
            <div className="relative w-full flex items-center">
              <span className="flex-grow h-px bg-white/20"></span>
              <span className="px-3 text-white/80 f-poppins text-sm ">or</span>
              <span className="flex-grow h-px bg-white/20"></span>
            </div>
            <button onClick={()=>signIn('google',{callbackUrl:'/'})} className="w-full bg-white/30 flex items-center py-1 justify-center text-[15px] gap-2 f-inter font-semibold rounded-full hover:bg-white/40 cursor-pointer transition-colors duration-300">
              <FcGoogle className="h-5 w-5" /> {state} with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
