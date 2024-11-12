import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog"
import { Spinner } from "../components/Spinner"


export const Read = ()=>{
    const {id} = useParams()
    const {loading , blog} = useBlog({
        id:id || ""
    })
    if(loading || !blog) {
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
                <FullBlog id={id||""} hotelmanager={blog.user.username} title={blog.title} content={blog.content} date={new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })}></FullBlog>
            </div>
        )

    }

}