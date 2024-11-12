import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { useBlog } from "../hooks";
import { BlogSkeleton } from "../components/Blogskleton";

export const Edit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { loading, blog } = useBlog({ id: id || "" });
    const [title, setTitle] = useState(blog?.title);
    const [description, setDescription] = useState(blog?.content);
    const [location, setLocation] = useState(blog?.location || "");
    const [address, setAddress] = useState(blog?.Address || "");
    const [isAvailable, setIsAvailable] = useState(blog?.Available || false);

    if (loading) {
        return (
            <div>
                <Appbar />
                <div className="flex justify-center flex-col items-center">
                    <div className="md:w-6/12 p-5">
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <Appbar />
                <div className="flex justify-center w-full pt-8">
                    <div className="max-w-screen-lg w-full">
                        <input
                            defaultValue={blog?.title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                            placeholder="Hotel name"
                        />

                        <TextEditor
                            onChange={(e) => setDescription(e.target.value)}
                            defaultValue={blog?.content}
                        />

                        {/* Location Field */}
                        <select
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    className="w-full mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
>
    <option value="" disabled>Select Location</option>
    <option value="Mumbai">Mumbai</option>
    <option value="Delhi">Delhi</option>
    <option value="Bangalore">Bangalore</option>
    <option value="Hyderabad">Hyderabad</option>
    <option value="Chennai">Chennai</option>
    <option value="Kolkata">Kolkata</option>
    <option value="Pune">Pune</option>
    <option value="Ahmedabad">Ahmedabad</option>
    <option value="Jaipur">Jaipur</option>
    <option value="Lucknow">Lucknow</option>
    <option value="Surat">Surat</option>
    <option value="Indore">Indore</option>
</select>


                        {/* Address Field */}
                        <input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            type="text"
                            className="w-full mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                            placeholder="Address"
                        />

                        {/* Availability Toggle */}
                        <div className="flex items-center mt-4">
                            <label className="mr-3 text-gray-800">Available</label>
                            <input
                                type="checkbox"
                                checked={isAvailable}
                                onChange={(e) => setIsAvailable(e.target.checked)}
                                className="toggle-checkbox"
                            />
                        </div>

                        {/* Save Changes Button */}
                        <button
                            onClick={async () => {
                                const response = await axios.put(
                                    `${BACKEND_URL}/api/v1/blog/edit`,
                                    {
                                        id: id,
                                        Title: title,
                                        Content: description,
                                        Available: isAvailable,
                                        Location: location,
                                        Address: address
                                    },
                                    {
                                        headers: {
                                            Authorization: localStorage.getItem("token"),
                                        },
                                    }
                                );
                                if (response.status === 200) {
                                    alert("Updated Successfully");
                                    navigate(`/read/${id}`);
                                }else {
                                    alert("No response found");
                                }
                            }}
                            type="submit"
                            className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};

function TextEditor({ onChange, defaultValue }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void, defaultValue: string | undefined }) {
    return (
        <div className="mt-2">
            <div className="w-full mb-4">
                <div className="flex items-center justify-between border">
                    <div className="my-2 bg-white rounded-b-lg w-full">
                        <label className="sr-only">Publish post</label>
                        <textarea
                            defaultValue={defaultValue}
                            onChange={onChange}
                            id="editor"
                            rows={8}
                            className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2"
                            placeholder="Write about your hotel..."
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
