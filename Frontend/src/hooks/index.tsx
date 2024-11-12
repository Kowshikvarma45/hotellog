import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useSetRecoilState } from "recoil";
import { userdetailsAtom } from "../stores/atoms/UserAtoms";

interface AllBlogs {
    id: string;
    title: string;
    content: string;
    Available:boolean | undefined
    location:string
    Address:string
    user: {
        username: string;
    };
}

interface Userdetails
 {
    msg: string,
    response: {
        hotels: AllBlogs[],
        username: string,
        email: string,
        password: string

    }
 }
//for getting one blog
export const useBlog = ({id}:{id:string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setblog] = useState<AllBlogs>();
    useEffect(() => {
        axios.get(BACKEND_URL + `/api/v1/blog/${id}`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        }).then((response) => {
            setblog(response.data.response);
            setLoading(false);
        }).catch((error) => {
            console.error("Error fetching hotels:", error);
            setLoading(false);
        });
    }, []);

    return { loading, blog };
};

//userdetails and user posts
export const useuserBlog = () => {
    const [loading, setLoading] = useState(true);
    const [userdetails, setuserdetails] = useState<Userdetails>();
    useEffect(() => {
        axios.get(BACKEND_URL + `/api/v1/blog/myposts`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        }).then((response) => {
            setuserdetails(response.data);
            setLoading(false);
        }).catch((error) => {
            console.error("Error fetching hotels:", error);
            setLoading(false);
        });
    }, []);

    return { loading, userdetails };
};






//for all blogs---

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<AllBlogs[]>([]);

    useEffect(() => {
        axios.post(BACKEND_URL + '/api/v1/blog/bulk').then((response) => {
            setBlogs(response.data);
            setLoading(false);
        }).catch((error) => {
            console.error("Error fetching Hotels:", error);
            setLoading(false);
        });
    }, []);

    return { loading, blogs };
};

// for email and password of user

export const useUpdateuser = ()=>{
    const [loading, setLoading] = useState(true);
    const setuserdetails = useSetRecoilState(userdetailsAtom)
    const [details, setdetails] = useState<{password:string,email:string}>({
        password:"",
        email:""
    });

    useEffect(() => {
        axios.get(BACKEND_URL + '/api/v1/signup/userdetails',{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        }).then((response) => {
            setuserdetails(response.data)
            setdetails(response.data);
            setLoading(false);
        }).catch((error) => {
            console.error("Error fetching blogs:", error);
            setLoading(false);
        });
    }, []);

    return { loading, details };

}
