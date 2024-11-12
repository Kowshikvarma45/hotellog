import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Appbar } from "../components/Appbar";
import { BlogSkeleton } from "../components/Blogskleton";

interface Reservation {
    id: string;
    hotelId: string;
    rooms: string;
    members: string;
    startDate: string;
    endDate: string;
    userId:string;
}

export const Reservations = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const res = await axios.post(BACKEND_URL+"/api/v1/blog/myreservations",{}, {
                    headers: {
                        Authorization:localStorage.getItem("token"),
                        "Content-Type": "application/json",
                    },
                });
                console.log(res)
                setReservations(res.data.response.reservation);
            } catch (err) {
                console.log(err)
                setError("Failed to fetch reservations. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    if (loading) {
        return (
            <div>
                <Appbar />
                <div className="flex justify-center flex-col items-center">
                    <div className="md:w-6/12 p-5">
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Appbar />
            <div className="flex justify-center flex-col items-center">
                <div className="text-6xl font-normal md:w-6/12 p-5">
                    My Reservations
                </div>
                <div className="md:w-6/12 p-5">
                    {error ? (
                        <p className="text-red-500">{error}</p>
                    ) : reservations.length > 0 ? (
                        <div className="space-y-4">
                            {reservations.map((reservation) => (
                                <div
                                    key={reservation.id}
                                    className="p-4 border border-gray-300 rounded-md shadow-sm"
                                >
                                    <h3 className="text-xl font-semibold">
                                        ReservationId:{reservation.id}
                                    </h3>
                                    <h3 className="text-xl font-semibold">
                                        HotelId:{reservation.hotelId}
                                    </h3>
                                    <p>
                                        <strong>Rooms:</strong> {reservation.rooms}
                                    </p>
                                    <p>
                                        <strong>Members:</strong> {reservation.members}
                                    </p>
                                    <p>
                                        <strong>Stay:</strong> {reservation.startDate} -{" "}
                                        {reservation.endDate}
                                    </p>
                                    
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>You have no reservations.</p>
                    )}
                </div>
            </div>
        </div>
    );
};
