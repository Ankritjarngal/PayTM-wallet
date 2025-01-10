export function ButtonComponent({input,onClick}){
    return(
        <div>
            <button  onClick={onClick} className="w-full bg-gray-800 text-white p-2 rounded-md ">
        {input}
        </button>
        </div>
        
    )
}
