import { HeadingBox } from "../components/HeadingBox";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
export function Dashboard(){
    return(
       <div className="bg-gray-800 overflow-y-scroll p-20 h-screen">
        <div className="bg-white rounded-md p-7 ml-8 ">
        <Appbar></Appbar>
        <Balance></Balance>
        <Users></Users>
        </div>
        

       </div>
        
    )
}
