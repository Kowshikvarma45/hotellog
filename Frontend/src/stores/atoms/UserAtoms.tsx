import axios from "axios";
import { atom, selector } from "recoil";
import { BACKEND_URL } from "../../config";

export const userAtom = selector({
    key:"userAtom",
    get:async()=>{
        const res = await axios.get(BACKEND_URL + '/api/v1/signin/getusername',{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        return res.data.username
}})

export const userdetailsAtom = atom({
    key:"userdetailsAtom",
    default:{
        password:"",
        email:""
    }
})

