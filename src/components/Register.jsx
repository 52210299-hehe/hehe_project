import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

function Register() {
  const { user } = useContext(UserContext);
  const [travels, setTravels] = useState([]);
  const [selectedTravel, setSelectedTravel] = useState(null);

  const fetchAlltravels = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/travels");
      const data = await res.json();
      setTravels(data);
    } catch (error) {
      console.error("Error fetching travels:", error);
    }
  };

  useEffect(() => {
    fetchAlltravels();
  }, []);

  const handleAddTravel = async (e) => {
    e.preventDefault();

    if (!selectedTravel) {
      alert("Please select a travel");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/bookings", {
        TravelID: selectedTravel,
        CustomerID: user.id,
      });

      alert("Booking created with pending payment!");
    } catch (err) {
      console.error(err);
      alert("Failed to create booking");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-200 flex flex-col items-center px-4 py-10">
      <h1 className="text-4xl font-bold text-purple-900 mb-6 text-center">
        Register a Travel
      </h1>

      <form
        onSubmit={handleAddTravel}
        className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-6"
      >
        <p className="text-purple-700 font-semibold mb-4">
          Choose a travel
        </p>

        {/* TRAVEL CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {travels.length === 0 && (
            <p className="text-gray-500">No travels available</p>
          )}

          {travels.map((travel) => {
            const isSelected =
              selectedTravel === travel.TravelTemplateID;

            return (
              <div
                key={travel.TravelTemplateID}
                onClick={() =>
                  setSelectedTravel(travel.TravelTemplateID)
                }
                className={`cursor-pointer rounded-xl border p-4 transition-all
                  ${
                    isSelected
                      ? "border-purple-700 bg-purple-50 shadow-md scale-[1.02]"
                      : "border-gray-200 hover:border-purple-400 hover:shadow"
                  }`}
              >
                <h3 className="text-lg font-bold text-purple-900">
                  ✈️ {travel.Destination}
                </h3>

                <p className="text-sm text-gray-600">
                  {new Date(travel.TravelDate).toLocaleDateString()}
                </p>

                <p className="text-sm mt-2 text-gray-700">
                  {travel.Description}
                </p>

                <p className="mt-3 font-semibold text-purple-700">
                  ${travel.Price}
                </p>
              </div>
            );
          })}
        </div>

        <button
          type="submit"
          className="bg-purple-700 text-white font-bold py-3 rounded-lg hover:bg-purple-900 transition-colors w-48 mx-auto block disabled:opacity-50"
          disabled={!selectedTravel}
        >
          Add to Your Travels
        </button>
      </form>
    </div>
  );
}

export default Register;
