import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

//Components
import TripHero from '../../../components/Trips/TripHero';

// Material UI
import { Container, Grid, Typography, Box } from '@material-ui/core';

const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005';


function TripDetailsPage() {
  const [trip, setTrip] = useState(null);

  const { tripId } = useParams();

  const getTrip = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/trips/${tripId}`);
      const oneTrip = response.data;
      setTrip(oneTrip);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrip();
  }, []);

  console.log(trip);

  return (
    <>
      {trip && (
        <>
          <header>
            <TripHero {...trip}/>
          </header>
          <main>
            <Container maxWidth="sm"></Container>

          <Link to={`/trips/edit/${trip._id}`}>
            <button>Edit Project</button>
          </Link>
          </main>
        </>
      )}
    </>
  );
}

export default TripDetailsPage;
