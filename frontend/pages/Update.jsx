import { useState } from "react"
import { ButtonComponent } from "../components/ButtonComponent"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { HeadingBox } from "../components/HeadingBox"

export function Update() {
    const [selected, setSelected] = useState("password")
    const [value, setValue] = useState("")
    const navigate = useNavigate();

    return (
        <div className="flex h-screen w-screen bg-gray-800 justify-center pt-6">
            <div className="flex justify-center flex-col h-[80vh] w-[60vh] bg-white rounded-md p-6">
                <div className="mb-12">
                <HeadingBox  title="Update" />
                </div>

                <select
                    value={selected}
                    onChange={(e) => {
                        setSelected(e.target.value);
                    }}
                    className="bg-gray-200 text-black rounded-lg p-2 mb-3 w-full"
                >
                    <option value="password">password</option>
                    <option value="firstname">firstname</option>
                    <option value="lastname">lastname</option>
                </select>

                <input
                    type="text"
                    placeholder={`New ${selected}`}
                    className="bg-gray-200 text-black rounded-lg p-2 mb-4 w-full"
                    onChange={(e) => {
                        setValue(e.target.value)
                    }}
                />

                <ButtonComponent
                    input={"Update"}
                    onClick={async () => {
                        await handle(selected, value);
                        navigate("/dashboard")
                    }}
                    className="mb-4 w-full"
                />
            </div>
        </div>
    );
}

async function handle(selected, value) {
    const operation = selected;
    await axios.put("http://localhost:3000/api/v1/user/update", 
        { [operation]: value },
        {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }
    )
}
