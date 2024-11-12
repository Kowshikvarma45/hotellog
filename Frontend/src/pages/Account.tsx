import { Link } from "react-router-dom"
import { Appbar } from "../components/Appbar"
import { Blogcomponent } from "../components/Blogcomponent"
import { useuserBlog } from "../hooks"
import { BlogSkeleton } from "../components/Blogskleton"

export const Account = ()=>{
    const {loading,userdetails} = useuserBlog()
    if(loading) {
        return (
            
            <div>
                <div>
                    <Appbar/>
                </div>
                <div className="flex justify-center flex-col items-center">
                <div className="md:w-6/12 p-5">
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                </div>
            </div>
            </div>
        );
    }
    else {
        return (
            <div>
                <Appbar></Appbar>
                <div className="flex justify-center flex-col items-center">
                    <div className="flex justify-between items-center">
                    <div className="text-6xl font-normal md:w-6/12 p-5">
                        {userdetails?.response.username}
                    </div>
                    <div className="md:w-6/12 p-5 flex justify-center">
                        <Link to={'/Check'}>
                            <button className="bg-black text-white py-1 px-3 rounded-md ml-5 mt-12 hover:scale-105">Update details</button>
                        </Link>
                    </div>
                    <div>

                    </div>
                    </div>
                    <div className="text-6xl font-normal md:w-6/12 p-5">
                        My Hotels
                    </div>
                    <div className="md:w-6/12 p-5">
                        {userdetails?.response.hotels.map((val) => (
                            <div key={val.id}>
                                <Blogcomponent 
                                    hotelmanager={val.user.username} 
                                    title={val.title} 
                                    content={val.content} 
                                    publisedDate="19-08-2024"
                                    id={val.id}
                                    edit={true}
                                    Available={val.Available}
                                    location={val.location}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )

    }
     
    

}