import { useRecoilValue } from "recoil";
import { userAtom, userdetailsAtom } from "../stores/atoms/UserAtoms";
import { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";


export const Updatefields = () => {
  const username = useRecoilValue(userAtom);
  const details = useRecoilValue(userdetailsAtom);
  const [showPassword, setShowPassword] = useState(false);
  const uref = useRef<HTMLInputElement>(null)
  const pref = useRef<HTMLInputElement>(null)
  const eref = useRef<HTMLInputElement>(null)
  const Navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  async function onclicked() {
    const username = uref.current?.value
    const email = eref.current?.value
    const password = pref.current?.value
    if(username != null && email != null && password != null) {
      const response = await axios.post(BACKEND_URL + '/api/v1/signup/updateuserdetails',{
        username:username,
        email:email,
        password:password
      },{
        headers:{
          Authorization:localStorage.getItem("token")
        }
      })
      if(response) {
        localStorage.setItem("token",response.data.token)
        alert(response.data.msg)
        Navigate('/blogs')
      }
      else {
        alert("Internal server error")
      }
    }
    else {
      alert
    }

  }


  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Update Your Information</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
          <input
            ref={uref}
            type="text"
            id="username"
            defaultValue={username}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            ref={eref}
            type="email"
            id="email"
            defaultValue={details.email}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
          <div className="relative flex items-center">
                        <input
                            ref={pref}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your existing password"
                            defaultValue={details.password}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-3 text-gray-600 focus:outline-none flex justify-center mt-1"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
        </div>
        <div className="text-center flex justify-between">
            <button onClick={onclicked} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Update
            </button>
            <button onClick={()=>Navigate('/blogs')} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Cancel</button>
        </div>
      </div>
    </div>
  );
};
