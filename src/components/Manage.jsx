
import { useContext } from 'react';
import { flightsctx } from '../App';


function Manage() {
  const { flights, setFlights, flight, setFlight, initialFlight } = useContext(flightsctx);

  
  

  const handleChange = (e) => {
    setFlight({ ...flight, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFlights([...flights, flight]);
    setFlight(initialFlight);
  };

  const remove = (number) => {
    setFlights(flights.filter((f) => f.number !== number));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-200 flex flex-col items-center px-4 py-10">
      <h1 className="text-4xl font-bold text-purple-900 mb-4 text-center">Manage Flights</h1>
      <form className="bg-white rounded-xl shadow-lg flex flex-col w-full max-w-xl mx-auto p-6 gap-4 mb-8"
        onSubmit={handleSubmit}>
        <input type="text" name="number" value={flight.number} onChange={handleChange} className="border border-purple-300 rounded-lg p-3 text-lg" required placeholder="flight number" />
        <input type="text" name="origin" value={flight.origin} onChange={handleChange} className="border border-purple-300 rounded-lg p-3 text-lg" required placeholder="origin" />
        <input type="text" name="destination" value={flight.destination} onChange={handleChange} className="border border-purple-300 rounded-lg p-3 text-lg" required placeholder="destination" />
        <input type="date" name="date" value={flight.date} onChange={handleChange} className="border border-purple-300 rounded-lg p-3 text-lg" required placeholder="Select date" />
        <button className="bg-purple-700 text-white font-bold py-3 rounded-lg hover:bg-purple-900 transition-colors w-32 mx-auto" type="submit">Add Flight</button>
      </form>

      <div className="w-full max-w-2xl mx-auto">
        <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
          <thead className="bg-purple-200">
            <tr>
             
              <th className="p-2 text-left">Number</th>
              <th className="p-2 text-left">Origin</th>
              <th className="p-2 text-left">Destination</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight, index) => (
              <tr className="bg-purple-100 rounded-lg" key={index}>
               
                <td className="p-2">{flight.number}</td>
                <td className="p-2">{flight.origin}</td>
                <td className="p-2">{flight.destination}</td>
                <td className="p-2">{flight.date}</td>
                <td className="p-2">
                  <button
                    className="bg-red-600 rounded-lg px-3 py-1 text-white"
                    onClick={() => remove(flight.number)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {flights.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">No flights added yet.</td>

              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Manage;