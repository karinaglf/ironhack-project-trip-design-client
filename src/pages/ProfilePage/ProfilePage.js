import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import axios from "axios"; 
 
const API_URL = "http://localhost:5005";

 function ProfilePage() {
   const [trips, setTrips] = useState([]);

  // Get the function for saving and verifying the token
  const { user } = useContext(AuthContext);
  console.log(user)

   const getTrips = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/trips`);
      setTrips(response.data);
    } catch(error) {
      console.log(error);
    }
  }; 
  useEffect(() => {
    getTrips();
  }, [] );

  return (
    <div>
      <h1>Profile Page</h1>

      {trips.map((oneTrip) => {
          return (
            <div key={oneTrip._id} >
                <h3>{oneTrip.tripName}</h3>
            </div>
          );
        })}     
      
    </div>
  );
}

export default ProfilePage;