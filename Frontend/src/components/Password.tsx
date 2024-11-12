import { useState } from "react";
import { Appbar } from "./Appbar";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Password = ({details}:{details:{password:string,email:string}}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [pass,setpass] = useState("")
    const Naviagate = useNavigate()

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    function onclicked() {
        if(pass === details.password) {
            alert("password verification successfull")
            Naviagate('/Update')
        }
        else{
            alert("sorry wrong password")
        }
    }

    return (
        <div>
            <Appbar />
            <div className="p-2 flex items-center justify-center">
                <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg border border-gray-200">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                        Confirm Your Password
                    </h2>
                    <p className="text-gray-600 text-center mb-4">
                        Please enter your existing password to make changes to your credentials.
                    </p>
                    <div className="relative flex items-center">
                        <input
                            className="w-full p-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 pr-10"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your existing password"
                            onChange={(e)=>{
                                setpass(e.target.value)
                            }}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-3 text-gray-600 focus:outline-none flex justify-center mt-1"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button onClick={onclicked} className="text-xl w-full text-white py-2 px-4 rounded-lg bg-blue-900 hover:scale-105">
                            Verify
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
