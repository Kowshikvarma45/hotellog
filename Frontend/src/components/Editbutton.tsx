import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"

export const Editbutton = ({edit,id}: {edit:boolean | undefined,id:string})=>{
    const Navigate = useNavigate()
    async function onclicked() {
        const ans = prompt("Are you sure you want to delete the post? enter something to 'Delete' to delete")
        if(ans == 'Delete') {
            const response = await axios.put(BACKEND_URL + '/api/v1/blog/delete',{
                id:id
            },
            {
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            }
            )
            if(response) {
                alert("post succesfully deleted")
                Navigate(`/hotels`)
            }
            else {
                alert("sorry no post found try to refresh the page.")
            }
        }
        else {
            alert("please enter 'Delete' only to proceed for deleting the post.")
        }
        
    }
    
    if(edit) {
        return (
            <div>
                <Link to={`/Edit/${id}`}>
                <button className="text-white py-1 px-3  mt-2 bg-blue-900 rounded-md hover:scale-105 duration-100 hover:bg-blue-950">Edit</button>
                </Link>
                <button onClick={onclicked} className="text-white py-1 px-3 ml-2  mt-2 bg-red-800 rounded-md hover:scale-105 duration-100 hover:bg-red-900 cursor-pointer">Delete</button>
            </div>
        )
    }
    else {
        <div>
        </div>
    }
    
}