import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const UpdateTravel = () => {
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch one travel by ID
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/travels/${id}`)
      .then((res) => {
        const travel = res.data;
        setDestination(travel.Destination);
        setTravelDate(travel.TravelDate?.split("T")[0]); // for date input
        setDescription(travel.Description);
        setPrice(travel.Price);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/travels/${id}`, {
        Destination: destination,
        TravelDate: travelDate,
        Description: description,
        Price: price,
      });

      navigate("/manage"); // or wherever your travels list is
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-200 flex flex-col items-center px-4 py-10">
      <h1 className="text-3xl font-bold text-purple-900 mb-6">Update Travel</h1>

      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6">
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-purple-700">Destination</span>
            <input
              type="text"
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-purple-700">Travel Date</span>
            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-purple-700">Description</span>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-purple-700">Price</span>
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
            />
          </label>

          <div className="flex items-center justify-between gap-4 pt-4">
            <button
              onClick={handleClick}
              className="bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg hover:bg-purple-900 transition-colors"
            >
              Update
            </button>

            <Link to="/manage" className="text-purple-700 hover:underline">
              Back to Travels
            </Link>
          </div>

          {error && <p className="text-red-600">Something went wrong!</p>}
        </div>
      </div>
    </div>
  );
};

export default UpdateTravel;
