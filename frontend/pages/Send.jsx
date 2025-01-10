import { HeadingBox } from "../components/HeadingBox"
import { Transfer } from "../components/Transfer"
import {useLocation} from "react-router-dom"
export function Send(){
    const location = useLocation()
    const query=new URLSearchParams(location.search);
    const name=query.get("name");
    const to=query.get("id");

    return(
        <div className="bg-gray-800 p-20 h-screen"
        >
            <div className="bg-white rounded-md p-7 ml-8 ">
                <HeadingBox title={"Send Money"}></HeadingBox>
                <Transfer to ={to} name={name} ></Transfer>
            </div>
        </div>
    )
}