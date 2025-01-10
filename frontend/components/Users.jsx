import { useEffect, useState} from "react";
import { ButtonComponent } from "./ButtonComponent";
import axios from "axios";
import {useNavigate} from "react-router-dom"

export const Users = () => {
    const [filter,setFilter]=useState("");
    const [users, setUsers] = useState([]);
    const navigate=useNavigate(onclick);

    useEffect(()=>{
        async function call()  {
            const res = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`)
            setUsers(res.data.user || []);    
        }
        call();

    },[filter])
    
        

    return (
        <>
            <div className="font-bold mt-6 text-lg">Users</div>
            <div className="my-2">
                <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full px-2 py-1 border rounded border-slate-200"
                    onChange={(e)=>{
                        setFilter(e.target.value)
                    }}
                />
            </div>
            <div>
                {users.length > 0 ? (
                    users.map((user, index) => <User key={user._id || index} user={user} navigate={navigate}/>)
                ) : (
                    
                    <p></p>
                )}
            </div>
        </>
    );
};

function User({ user,navigate }) {
    return (
        <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex items-center justify-center h-full text-2xl">
                        {user.firstname ? user.firstname[0] : "?"}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div>
                        {user.firstname || "Unknown"} {user.lastname || "Unknown"}
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center h-full">
                <ButtonComponent onClick={()=>{
                        navigate(`/send?id=${user._id}&name=${user.firstname}`);
                    }}input={"Send Money"} />
            </div>
        </div>
    );
}