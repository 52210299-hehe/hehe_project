import React, { useState,useEffect } from 'react';
import { UserContext } from './UserContext';
function Register() {
  const {token} = React.useContext(UserContext);
  const [travels, setTravels] = useState([]);
  const [selectedNb, setSelectedNb] = useState('');
  const [yourTravels, setYourTravels] = useState([]);
    const fetchAlltravels = async () => {
     try{
       const res = await fetch('http://localhost:5000/api/travels');
       const data = await res.json();
       setTravels(data);
       console.log("Fetched travels:", data);
     } catch (error) {
       console.error("Error fetching travels:", error);
     }
     };
   useEffect(() => {
    
     fetchAlltravels();
 }, []);
 const handleAddTravel = (e) => {
    e.preventDefault();
    if (!selectedNb) return;
    const travel = travels.find(
      (t) =>
        String(t.TravelTemplateID) === String(selectedNb)
    );
    if (!travel) return;
    setYourTravels((prev) => {
      if (prev.some((p) => String(p.TravelTemplateID) === String(travel.TravelTemplateID))) return prev;
      return [...prev, travel];
    });
    setSelectedNb('');
  };

  const handleRemove = (TravelTemplateID) => {
    setYourTravels((prev) => prev.filter((t) => String(t.TravelTemplateID) !== String(TravelTemplateID)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-200 flex flex-col items-center px-4 py-10">

  <h1 className="text-4xl font-bold text-purple-900 mb-4 text-center">
    Register a Travel
  </h1>

  <form
    className="bg-white rounded-xl shadow-lg flex flex-col w-full max-w-xl mx-auto p-6 gap-4 mb-8"
    onSubmit={handleAddTravel}
  >
    <label htmlFor="travel" className="text-purple-700 font-semibold">
      Choose a travel
    </label>

    <select
      id="travel"
      value={selectedNb}
      onChange={(e) => setSelectedNb(e.target.value)}
      className="border border-purple-300 rounded-lg p-3 text-lg"
      required
    >
      <option value="" disabled>
        -- Select a travel --
      </option>

      {travels.length === 0 && (
        <option disabled>No travels available</option>
      )}

      {travels.map(travel => (
        <option
          key={travel.TravelTemplateID}
          value={travel.TravelTemplateID}
        >
          {travel.Destination} —{" "}
          {new Date(travel.TravelDate).toLocaleDateString()} —{" "}
          {travel.Description} (${travel.Price})
        </option>
      ))}
    </select>

    <button
      className="bg-purple-700 text-white font-bold py-3 rounded-lg hover:bg-purple-900 transition-colors w-40 mx-auto"
      type="submit"
    >
      Add to Your Travels
    </button>
  </form>
</div>


    //   <div className="w-full max-w-2xl mx-auto">
    //     <h2 className="text-2xl font-bold text-purple-800 mb-4 text-center">Your Travels</h2>
    //     <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
    //       <thead className="bg-purple-200">
    //         <tr>
    //           <th className="py-3 px-2 text-purple-900 text-lg">TravelTemplateID</th>
    //           <th className="py-3 px-2 text-purple-900 text-lg">Origin</th>
    //           <th className="py-3 px-2 text-purple-900 text-lg">Destination</th>
    //           <th className="py-3 px-2 text-purple-900 text-lg">Date</th>
    //           <th className="py-3 px-2 text-purple-900 text-lg">Actions</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {yourTravels.length === 0 ? (
    //           <tr>
    //             <td colSpan={5} className="text-center py-6 text-gray-400">No travels added yet.</td>
    //           </tr>
    //         ) : (
    //           yourTravels.map((travel, index) => (
    //             <tr key={index} className="bg-purple-100 border-b">
    //               <td className="p-2 text-center">{travel.TravelTemplateID}</td>
    //               <td className="p-2 text-center">{travel.origin}</td>
    //               <td className="p-2 text-center">{travel.destination}</td>
    //               <td className="p-2 text-center">{travel.date}</td>
    //               <td className="p-2 text-center">
    //                 <button className="bg-red-600 rounded-lg px-3 py-1 text-white hover:bg-red-800" onClick={() => handleRemove(travel.TravelTemplateID)} type="button">Remove</button>
    //               </td>
    //             </tr>
    //           ))
    //         )}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
  );
}

export default Register;
