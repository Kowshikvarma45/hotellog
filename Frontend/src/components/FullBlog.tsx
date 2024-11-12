import { useState } from "react";
import { Appbar } from "./Appbar";
import { Avatar } from "./Avatar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

interface FullBlog {
    id:string;
    title: string;
    content: string;
    date: string;
    hotelmanager: string;
}

export const FullBlog = ({id, title, content, date, hotelmanager }: FullBlog) => {
    const [reservationData, setReservationData] = useState({
        rooms: "",
        members: "",
        startDate: "",
        endDate: "",
    });
    console.log("new id is : " + id)
    const Navigate = useNavigate()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setReservationData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            // Send reservation data to the backend
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog/reserve`, {
                ...reservationData,
                hotelId: id // Pass the correct hotel ID here
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")                }
            });
    
            if (response.status === 201) {
                alert("Reservation created successfully!");
                Navigate('/hotels')
                
                console.log("Reservation Details:", response.data.reservation);
            } else {
                alert("Failed to create reservation. Please try again.");
            }
        } catch (error) {
            console.error("Error creating reservation:", error);
            alert("An error occurred while creating the reservation.");
        }
    };

    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-xl">
                    {/* Main Content Area */}
                    <div className="col-span-8">
                        {/* Hotel Title */}
                        <div className="text-5xl font-extrabold">
                            {title}
                        </div>
                        {/* Availability Date */}
                        <div className="text-slate-500 pt-2">
                            Available from {date}
                        </div>
                        {/* Hotel Description */}
                        <div className="pt-4">
                            {content}
                        </div>

                        {/* Reservation Form */}
                        <div className="pt-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Number of Rooms
                                    </label>
                                    <input
                                        type="number"
                                        name="rooms"
                                        value={reservationData.rooms}
                                        onChange={handleInputChange}
                                        className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Number of Members
                                    </label>
                                    <input
                                        type="number"
                                        name="members"
                                        value={reservationData.members}
                                        onChange={handleInputChange}
                                        className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Start Date
                                    </label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={reservationData.startDate}
                                        onChange={handleInputChange}
                                        className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        End Date
                                    </label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={reservationData.endDate}
                                        onChange={handleInputChange}
                                        className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition duration-200"
                                >
                                    Reserve
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <div className="col-span-4">
                        <div className="text-slate-600 text-lg">
                            Hotel Contact
                        </div>
                        <div className="flex w-full">
                            <div className="pr-4 flex flex-col justify-center">
                                <Avatar size={8} Authorname={hotelmanager || "Hotel Manager"} pad={2} />
                            </div>
                            <div>
                                {/* Hotel Manager */}
                                <div className="text-xl font-bold">
                                    {hotelmanager || "Hotel Manager"}
                                </div>
                                <div className="pt-2 text-slate-500">
                                    Here to assist you with any inquiries about your stay.
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    );
};
