import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Manage() {
  const navigate = useNavigate();

  const [NewTravel, setNewTravel] = useState({
    Destination: "",
    TravelDate: "",
    Description: "",
    Price: "",
  });

  const [travels, setTravels] = useState([]);

  const fetchAlltravels = async () => {
    try {
      const res = await fetch("https://travel-backend-iw4y.onrender.com/api/travels");
      const data = await res.json();
      setTravels(data);
    } catch (error) {
      console.error("Error fetching travels:", error);
    }
  };

  useEffect(() => {
    fetchAlltravels();
  }, []);

  const handleChange = (e) => {
    setNewTravel({ ...NewTravel, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://travel-backend-iw4y.onrender.com/api/travels", NewTravel);
      alert("Travel added!");
      fetchAlltravels();
      setNewTravel({ Destination: "", TravelDate: "", Description: "", Price: "" });
    } catch (err) {
      if(err.message)
      console.error(err);
    if(err.status === 400)
      alert("price must be a valid number");
      else
      alert("Failed to add travel");
    }
  };

  const remove = async (id) => {
    try {
      const res = await fetch(`https://travel-backend-iw4y.onrender.com/api/travels/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setTravels((prev) => prev.filter((travel) => travel.TravelTemplateID !== id));
        fetchAlltravels();
      }
    } catch (err) {
      console.error("Error removing travel:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-200 p-6">
      <h1 className="text-4xl font-bold text-purple-900 mb-6 text-center">
        Manage Travels
      </h1>

      <form
        className="bg-white rounded-xl shadow-lg p-6 mb-8 max-w-xl mx-auto flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="Destination"
          placeholder="Destination"
          value={NewTravel.Destination}
          onChange={handleChange}
          className="border border-purple-300 rounded-lg p-3"
          required
        />
        <input
          type="date"
          name="TravelDate"
          value={NewTravel.TravelDate}
          onChange={handleChange}
          className="border border-purple-300 rounded-lg p-3"
          required
        />
        <input
          type="text"
          name="Description"
          placeholder="Description"
          value={NewTravel.Description}
          onChange={handleChange}
          className="border border-purple-300 rounded-lg p-3"
          required
        />
        <input
          type="number"
          name="Price"
          placeholder="Price"
          value={NewTravel.Price}
          onChange={handleChange}
          className="border border-purple-300 rounded-lg p-3"
          required
        />
        <button
          type="submit"
          className="bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-900"
        >
          Add Travel
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {travels.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No travels available.
          </p>
        ) : (
          travels.map((travel) => (
            <div
              key={travel.TravelTemplateID}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between"
            >
              <div>
                 <p className="text-purple-600 mb-1 text-xl">
                  <span className="font-bold text-xl">Destination:</span>{" "}
                  {travel.Destination}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(travel.TravelDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold">Description:</span>{" "}
                  {travel.Description}
                </p>
                <p className="text-gray-800 font-semibold mb-2">
                  Price: ${travel.Price}
                </p>
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                  onClick={() => remove(travel.TravelTemplateID)}
                >
                  Remove
                </button>
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                  onClick={() => navigate(`/update/${travel.TravelTemplateID}`)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Manage;
