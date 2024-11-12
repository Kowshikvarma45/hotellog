import { Password } from "../components/Password"
import { Spinner } from "../components/Spinner"
import { useUpdateuser } from "../hooks"

export const Passcheck = ()=>{
    const {loading,details} = useUpdateuser()
    if(loading) {
        return (
            <div className="min-h-screen items-center flex justify-center">
                <Spinner></Spinner>
                <div className="animate-pulse text-3xl">Loading...</div>
            </div>
        )
    }
    else {
        return (
            <div>
                <Password details={details} ></Password>
            </div>
        )
    }
    
}