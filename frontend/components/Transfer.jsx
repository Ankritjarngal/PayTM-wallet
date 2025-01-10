import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Transfer({to, name}) {
  const tfTo=to
  const navigate=useNavigate()
 
  const [amount, setAmount] = useState(0);
  
    return (
      <div className="items-center">
        <div className="flex items-center">
          <div className="flex justify-center items-center bg-gray-800 text-lg text-white rounded-full h-12 w-12 m-4">
            {name[0].toUpperCase()}
          </div>
          <div className="text-lg font-bold">{name.toUpperCase()}</div>
        </div>
        <div className=" items-center">
            <div className="text-md font-bold">Amount (in Rs)</div>
            <div className="mt-4">
                <input
          type="number"
          placeholder="Enter Amount"
          className="bg-gray-200 text-black rounded-lg p-1 mb-2 w-full h-10"
          onChange={(e)=>{
            setAmount(e.target.value);
          }}
            />
           </div>
        </div>

        <div className="flex items-center mt-4">
            <button  className="bg-gray-800 text-white rounded-md w-full h-10 text-md font-bold" onClick={async()=>{
              await axios.post("http://localhost:3000/api/v1/account/transfer",{
                to:tfTo,
                amount:amount

              },{
                headers:{
                  authorization:"Bearer "+localStorage.getItem("token")
                }
              }
            
            )
            navigate("/dashboard")

           
            }
            }>Transfer</button>
        </div>
      </div>
    );
  }
  