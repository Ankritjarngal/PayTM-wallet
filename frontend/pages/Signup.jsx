import { HeadingBox } from "../components/HeadingBox";
import { ButtonComponent } from "../components/ButtonComponent";
import { AuthComponent } from "../components/BottomLink";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const navigate=useNavigate();

    const[username,setUsername]=useState("")
    const[fisrtname,setFirstname]=useState("")
    const[lastname,setLastname]=useState("")
    const[password,setPassword]=useState("")
    async function handleClick(){
        const res = await axios.post('http://localhost:3000/api/v1/user/signup', {
            
                username:username,
                firstname:fisrtname,
                lastname:lastname,
                password:password

        
    })
    
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard",{
      })

  }
    
  return (
    <div className="flex h-screen w-screen bg-gray-800 overflow-y-scroll justify-center pt-10">
      <div className="flex justify-center  flex-col h-[80vh] w-[60vh] bg-white rounded-md p-8">
        <HeadingBox title="Signup" />
        
        <input
          type="text"
          placeholder="Enter Email"
          className="bg-gray-200 text-black rounded-lg p-2 mb-4 w-full"
          onChange={(e)=>{
            setUsername(e.target.value)
          }}
        />
        
        <input
          type="text"
          placeholder="Enter firstname"
          className="bg-gray-200 text-black rounded-lg p-2 mb-4 w-full"
          onChange={(e)=>{
            setFirstname(e.target.value)
          }}
        />
        
        <input
          type="text"
          placeholder="Enter lastname"
          className="bg-gray-200 text-black rounded-lg p-2 mb-4 w-full"
          onChange={(e)=>{
            setLastname(e.target.value)
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
        
        <ButtonComponent onClick={handleClick} input="Signup" className="mb-4 w-full" />
        
        <AuthComponent mode="Signup" />
      </div>
    </div>
  );
}
