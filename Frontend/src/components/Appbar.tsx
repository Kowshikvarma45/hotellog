import { useRecoilValue } from "recoil"
import { userAtom } from "../stores/atoms/UserAtoms"
import { Avatar } from "./Avatar"
import { Link } from "react-router-dom"

export const Appbar = ()=>{
    const username = useRecoilValue(userAtom)
    return (
        <div className="p-5 m-4 flex justify-between border-solid border-b-2 border-slate-300">
            <div>
                <Link to={'/hotels'}>
                <div className="text-3xl hover:scale-105 hover:font-extrabold font-bold">Hotellog</div>
                </Link>
            </div>
            <div>
                <div className="flex justify-around">
                <div className="mr-6">
                    <Link to={'/publish'}>
                        <button className="bg-green-800 p-2 rounded-md text-white hover:scale-110 duration-500 hover:bg-green-900 hover:rounded-lg">Publish</button>
                    </Link>
                </div>
                <div className="mr-6">
                    <Link to={'/Reservations'}>
                        <button className="bg-blue-800 p-2 rounded-md text-white hover:scale-110 duration-500 hover:bg-blue-900 hover:rounded-lg">Reservations</button>
                    </Link>
                </div>
                
                <Link to={'/Account'}>
                <Avatar size={10} pad={2} Authorname={username}></Avatar>
                </Link>
                </div>
            </div>
        </div>
    )
}