import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005';

function EditTripPage() {
    const [trip, setTrip] = useState(null)

    const { tripId } = useParams();
  // Make an axios call when the component is created
  // and get the trip details from the server

  const getTrip = async () => {
    try {
      const response = await axios.get(`http://localhost:5005/api/trips/${tripId}`);
      const oneTrip = response.data;
      setTrip(oneTrip);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTrip();
  }, [])

    return ( 
        <div className="">
        <h1>Edit Trip Form</h1>

        {trip && (
          <>
            <h1>EDIT TRIP: {trip.tripName}</h1>
  
            <Link to={`/trips/edit/${trip._id}`}>
              <button>Edit Project</button>
            </Link>
          </>  
        )}
        </div>
     );
}

export default EditTripPage;