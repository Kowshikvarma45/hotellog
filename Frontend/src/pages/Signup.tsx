import { Quote } from "../components/Quote"
import { Header } from "../components/Header"
import { Input } from "../components/Input"
import { useState } from "react"
import { signupValidationType } from "@kvarma/medium-common"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"


export const Signup = ()=>{
    const [Signup,setSignup] = useState<signupValidationType>({
        username:"",
        email:"",
        password:""
    })
    const [msg,setmsg] = useState("")
    const Navigate = useNavigate()
    async function onclicked() {
        setmsg("Please Wait while we Processing...")
        if(Signup.username != "" && Signup.email != "" && Signup.password != "") {
            try{
                const response = await axios.post(BACKEND_URL +'/api/v1/signup',Signup)
                console.log(response)
                if(response.status === 200) {
                    setmsg("succesfull")
                    alert(response.data.msg)
                    Navigate('/hotels')
                    localStorage.setItem('token',response.data.token)
                }
                else {
                    alert(response.data.msg)
                    setmsg("")
                }
            }catch(err) {
                alert("unsuccesfull due to internal error try again")
                console.log("an error ocurred : "+err)
                setmsg("")
            }
        }
        else {
            alert("Enter your details to get started")
            setmsg("")
        }
    }
    return (

        <div className="lg:grid grid-cols-2">
            <div className="min-h-screen flex items-center justify-center align-middle bg-slate-50">
                <div>
                    <div className="text-lg font-light">{msg}</div>
                    <Header header={"Create an Account"} des={"Already have an Account?"} link={"Signin"} navigate="/Signin"></Header>
                    <Input label={"Username"} type="text" onchange={(e)=>{
                        setSignup(
                            {
                                ...Signup,
                                username:e.target.value
                            }
                        )
                    }}></Input>
                    <Input label={"Email"} type="text" onchange={(e)=>{
                        setSignup(
                            {
                                ...Signup,
                                email:e.target.value
                            }
                        )
                    }}></Input>
                    <Input label={"Password"} type={"password"} onchange={(e)=>{
                        setSignup(
                            {
                                ...Signup,
                                password:e.target.value
                            }
                        )
                    }}></Input>
                    <button onClick={onclicked} className="w-full text-white bg-black rounded-md p-2 my-5 hover:scale-105 border-solid border-2 border-white hover:border-collapse">Signup</button>
                </div>
            </div>
        <div className="hidden lg:block">
        <Quote main={"Welcome to Hotellog"} by={"by Team DBMS"}></Quote>
        </div>
        </div>
    )

}