import { useEffect, useState } from "react";
import axios from "axios";





function Manage() {

const [NewTravel, setNewTravel] = useState({
    Destination: "",
    TravelDate: "",
    Description: "",
    Price: "",
    
    });
const clearFields = () => {
    setNewTravel({
        Destination: "",
        TravelDate: "",
        Description: "",
        Price: "",
    });
  };
  const [travels, setTravels] = useState([]);
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
const remove = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/api/travels/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setTravels(prev =>
    prev.filter(travel => travel.id !== id)
  );
      fetchAlltravels();
      console.log(`Travel with id ${id} removed.`);
    } else {
      console.error(`Failed to remove travel with id ${id}.`);
    }
  } catch (error) {
    console.error("Error removing travel:", error);
  }
  
};

  const handleChange = (e) => {
    setNewTravel({ ...NewTravel, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) =>{
      e.preventDefault();  
      try{

         await axios.post("http://localhost:5000/api/travels",NewTravel);
         
         alert("added!");
         fetchAlltravels();
        }
        catch(err){
            console.log(err)
            alert("invalid");
            console.log(NewTravel);
        }
        clearFields();
    };
  
  

 

  return (
    <>
    
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-200 flex flex-col items-center px-4 py-10">
      <h1 className="text-4xl font-bold text-purple-900 mb-4 text-center">Manage travels</h1>
      <form className="bg-white rounded-xl shadow-lg flex flex-col w-full max-w-xl mx-auto p-6 gap-4 mb-8"
        onSubmit={handleSubmit}>
        <input type="text" name="Destination" value={NewTravel.Destination} onChange={handleChange} className="border border-purple-300 rounded-lg p-3 text-lg" required placeholder="Destination" />
        <input type="date" name="TravelDate" value={NewTravel.TravelDate} onChange={handleChange} className="border border-purple-300 rounded-lg p-3 text-lg" required placeholder="Select date" />
        <input type="text" name="Description" value={NewTravel.Description} onChange={handleChange} className="border border-purple-300 rounded-lg p-3 text-lg" required placeholder="Description" />
        <input type="number" name="Price" value={(Number)(NewTravel.Price)} onChange={handleChange} className="border border-purple-300 rounded-lg p-3 text-lg" required placeholder="Price" />
        <button className="bg-purple-700 text-white font-bold py-3 rounded-lg hover:bg-purple-900 transition-colors w-32 mx-auto" type="submit">Add travel</button>
      </form>

      <div className="w-full max-w-3xl mx-auto h-screen ">
        <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
          <thead className="bg-purple-200">
            <tr>
             
              <th className="p-2 text-left">Destination</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {travels.map((travel, index) => (
              <tr className="bg-purple-100 rounded-lg" key={index}>
              
               
                <td className="p-2">{travel.Destination}</td>
                <td className="p-2">{new Date(travel.TravelDate).toLocaleDateString()}</td>
                <td className="p-2">{travel.Description}</td>
                <td className="p-2">{travel.Price}</td>
                <td className="p-2">
                  <button
                    className="bg-red-600 rounded-lg px-3 py-1 text-white"
                    onClick={() => remove(travel.TravelTemplateID)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
             ))}
            {travels.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">No travels added yet.</td>

              </tr>
            )}
            
          </tbody>
          
        </table>
      </div>
      
    </div>
   
  </>);
}


export default Manage;