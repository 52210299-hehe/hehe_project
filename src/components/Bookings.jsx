import { UserContext } from "./UserContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

function Bookings() {
  const { user } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);
    const fetchBookings = async () => {
        try {
         const res = await axios.get(`http://localhost:5000/api/bookings/user/${user.id}`);
            setBookings(res.data);
            console.log("Fetched bookings:", res.data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };
   const handlePayment = async (BookingID) => {
  try {
    await axios.put(`http://localhost:5000/api/bookings/${BookingID}`);
    alert("Payment successful!");
    fetchBookings(); 
  } catch (error) {
    console.error("Error processing payment:", error);
    alert("Failed to process payment.");
  }
};
const handleCanceling = async (BookingID) => {
  try {
    await axios.delete(`http://localhost:5000/api/bookings/${BookingID}`);
    alert("Booking canceled!");
    fetchBookings(); 
  } catch (error) {
    console.error("Error canceling booking:", error);
    alert("Failed to cancel booking.");
  }
};

   useEffect(() => {
      fetchBookings();
    }, []);
    return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-200 flex flex-col items-center px-4 py-10">
      <h1 className="text-4xl font-bold text-purple-900 mb-4 text-center">
        My Bookings
        </h1>
        <div className="bg-white rounded-xl shadow-lg flex flex-col w-full max-w-4xl mx-auto p-6 gap-4 mb-8">
            {bookings.length === 0 ? (
                <p className="text-purple-700 italic">No bookings found.</p>
            ) : (
                bookings.map((booking) => (
                    <div key={booking.BookingID} className="border-b border-purple-200 pb-4 mb-4">
                        <h2 className="text-2xl font-semibold text-purple-900">
                            Booking ID: {booking.BookingID}
                        </h2>
                        <p className="text-purple-800">Travel ID: {booking.TravelID}</p>
                        <p className="text-purple-800">Status: {booking.Payment_status}</p>

                        <button className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 mt-2"
                        onClick={() => handlePayment(booking.BookingID)}>
                            Pay
                        </button>

                        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 mt-2 ml-2"
                        onClick={() => handleCanceling(booking.BookingID)}>
                            Cancel
                        </button>
                    </div>

                ))
            )}
        </div>
    </div>
  );
}
export default Bookings;