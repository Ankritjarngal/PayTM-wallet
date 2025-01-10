import { HeadingBox } from "../components/HeadingBox";
import { ButtonComponent } from "../components/ButtonComponent";
import { AuthComponent } from "../components/BottomLink";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
    const navigate=useNavigate();

  return (
    <div className="flex h-screen w-screen bg-gray-800 overflow-y-scroll justify-center shadow-sm pt-10">
      <div className="flex justify-center flex-col h-[80vh] w-[60vh] bg-white rounded-md p-8">
        <HeadingBox title="Signin" />
        
        <input
          type="text"
          placeholder="Enter username"
          className="bg-gray-200 text-black rounded-lg p-2 mb-4 w-full"
          onChange={(e)=>{
            setUsername(e.target.value)
          }}
         
        />
        
        
        
        
        <input
          type="password"
          placeholder="Enter password"
          className="bg-gray-200 text-black rounded-lg p-2 mb-4 w-full"
          onChange={(e)=>{
            setPassword(e.target.value)
          }}
        />
        
        <ButtonComponent onClick={async()=>{
          const signin=await axios.post("http://localhost:3000/api/v1/user/signin",{
            username:username,
            password:password


          })
          localStorage.setItem("token",signin.data.token)
          navigate("/dashboard")
          
          
        }} input="Signin" className="mb-4 w-full" />
        
        <AuthComponent mode="Signin" />
      </div>
    </div>
  );
}

