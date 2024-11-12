import { ChangeEvent, useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"



interface Input {
    label:string,
    type:string,
    onchange:(e:ChangeEvent<HTMLInputElement>) => void
}
export const Input = ({label,type,onchange}:Input)=>{
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    if(type === "password") {
        return (
            <div>
                <label className="text-2xl font-medium">{label}</label>
                <div className="relative flex items-center">
                        <input
                            className="w-full my-2 p-2 border-solid border-2 border-gray-400 rounded-md hover:scale-105 hover:border-blue-700"
                            type={showPassword ? "text" : "password"}
                            placeholder={label}
                            onChange={onchange}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-3 text-gray-600 focus:outline-none flex justify-center mt-3"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
            </div>

            </div>
        )

    }
    else {
        return (
            <div className="pt-5">
                <label className="text-2xl font-medium">{label}</label>
                <input onChange={onchange} type={type} placeholder={label} className="w-full my-2 p-2 border-solid border-2 border-gray-400 rounded-md hover:scale-105 hover:border-blue-700"/>
            </div>
        )
    }

}