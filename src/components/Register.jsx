import React, { useState } from 'react';
import { useContext } from 'react';
import { flightsctx } from '../App';
/*
const randomTravels = [
  { id: '1', number: 'TRV101', origin: 'Paris', destination: 'Rome', date: '2025-12-01' },
  { id: '2', number: 'TRV202', origin: 'London', destination: 'Berlin', date: '2025-12-05' },
  { id: '3', number: 'TRV303', origin: 'Madrid', destination: 'Lisbon', date: '2025-12-10' },
  { id: '4', number: 'TRV404', origin: 'New York', destination: 'Tokyo', date: '2025-12-15' },
  { id: '5', number: 'TRV505', origin: 'Sydney', destination: 'Dubai', date: '2025-12-20' },
];
*/
function Register() {
  const { flights } = useContext(flightsctx);
  const [selectedNb, setSelectedNb] = useState(flights.length > 0 ? flights[0].number : '');
  const [yourTravels, setYourTravels] = useState([]);
  const handleAddTravel = (e) => {
    e.preventDefault();
    const travel = flights.find(t => t.number === selectedNb);
    if (travel && !yourTravels.some(t => t.number === travel.number)) {
      setYourTravels([...yourTravels, travel]);
    }
  };

  const handleRemove = (number) => {
    setYourTravels(yourTravels.filter(t => t.number !== number));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-200 flex flex-col items-center px-4 py-10">
      <h1 className="text-4xl font-bold text-purple-900 mb-4 text-center">Register a Travel</h1>
      <form className="bg-white rounded-xl shadow-lg flex flex-col w-full max-w-xl mx-auto p-6 gap-4 mb-8" onSubmit={handleAddTravel}>
        <label htmlFor="travel" className="text-purple-700 font-semibold">Choose a travel</label>
        <select
          id="travel"
          value={selectedNb}
          onChange={e => setSelectedNb(e.target.value)}
          className="border border-purple-300 rounded-lg p-3 text-lg"
        >
          {flights.length === 0 && (<option disabled>No travels available</option>
          )}
          {flights.map(travel => (
            <option key={travel.number} value={travel.number}>
              {travel.number} - {travel.origin} to {travel.destination} ({travel.date})
            </option>
          ))}
        </select>
        <button className="bg-purple-700 text-white font-bold py-3 rounded-lg hover:bg-purple-900 transition-colors w-32 mx-auto" type="submit">Add to Your Travels</button>
      </form>

      <div className="w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-purple-800 mb-4 text-center">Your Travels</h2>
        <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
          <thead className="bg-purple-200">
            <tr>
              <th className="py-3 px-2 text-purple-900 text-lg">Number</th>
              <th className="py-3 px-2 text-purple-900 text-lg">Origin</th>
              <th className="py-3 px-2 text-purple-900 text-lg">Destination</th>
              <th className="py-3 px-2 text-purple-900 text-lg">Date</th>
              <th className="py-3 px-2 text-purple-900 text-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {yourTravels.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">No travels added yet.</td>
              </tr>
            ) : (
              yourTravels.map((travel, index) => (
                <tr key={index} className="bg-purple-100 border-b">
                  <td className="p-2 text-center">{travel.number}</td>
                  <td className="p-2 text-center">{travel.origin}</td>
                  <td className="p-2 text-center">{travel.destination}</td>
                  <td className="p-2 text-center">{travel.date}</td>
                  <td className="p-2 text-center">
                    <button className="bg-red-600 rounded-lg px-3 py-1 text-white hover:bg-red-800" onClick={() => handleRemove(travel.number)} type="button">Remove</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Register;
