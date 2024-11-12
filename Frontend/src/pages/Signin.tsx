import { Quote } from "../components/Quote"
import { Header } from "../components/Header"
import { Input } from "../components/Input"
import { useState } from "react"
import { signinValidationType} from "@kvarma/medium-common"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"


export const Signin = ()=>{
    const [Signin,setSignin] = useState<signinValidationType>({
        email:"",
        password:""
    })
    const [msg,setmsg] = useState("")
    const Navigate = useNavigate()
    async function onclicked() {
        setmsg("Please Wait while we Processing...")
        if(Signin.email != "" && Signin.password != "") {
        try{
            const response = await axios.post(BACKEND_URL+'/api/v1/signin',Signin)
        if(response.status === 200) {
            alert(response.data.msg)
            localStorage.setItem('token',response.data.token)
            Navigate('/hotels')
        }
        else {
            alert("An error occured while fetching the data...")
            setmsg("")
        }
        }catch(err) {
            alert("Invalid email")
            setmsg("")
        }
    }
    else {
        alert("Enter your credintials")
        setmsg("")
    }
    }
    return (

        <div className="lg:grid grid-cols-2">
            <div className="hidden lg:block">
                <Quote main={"Explore more hotles get connected with bloggers world wide"} by={"by Team DBMS"}></Quote>
            </div>
            <div className="min-h-screen flex items-center justify-center align-middle bg-slate-50">
                <div>
                    <div className="text-lg font-light">{msg}</div>
                    <Header header={"Login to your Account"} des={"Doesn't have an Account?"} link={"Signup"} navigate="/"></Header>
                    <Input label={"Email"} type="text" onchange={(e)=>{
                        setSignin(
                            {
                                ...Signin,
                                email:e.target.value
                            }
                        )
                    }}></Input>
                    <Input label={"Password"} type={"password"} onchange={(e)=>{
                        setSignin(
                            {
                                ...Signin,
                                password:e.target.value
                            }
                        )
                    }}></Input>
                    <button onClick={onclicked} className="w-full text-white bg-black rounded-md p-2 my-5 hover:scale-105 border-solid border-2 border-white hover:border-collapse">Signin</button>
                </div>
            </div>
        </div>
    )

}