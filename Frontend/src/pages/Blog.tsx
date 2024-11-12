import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks";
import { Blogcomponent } from "../components/Blogcomponent";
import { BlogSkeleton } from "../components/Blogskleton";


export const Blog = () => {
    const { loading, blogs } = useBlogs();
    if (loading) {
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
    return (
        <div>
            <Appbar></Appbar>
            <div className="flex justify-center flex-col items-center text-5xl font-bold">Explore Hotels</div>
            <div className="flex justify-center flex-col items-center">
                <div className="md:w-6/12 p-5">
                    {blogs.map((val) => (
                        <div key={val.id}>
                            <Blogcomponent 
                                hotelmanager={val.user.username} 
                                title={val.title} 
                                content={val.content} 
                                publisedDate={new Date().toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                id={val.id}
                                Available={val.Available}
                                location={val.location}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
