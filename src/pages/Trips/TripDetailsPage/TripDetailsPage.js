import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

//Components
import TripHero from '../../../components/Trips/TripHero';
import TripCoverMsg from '../../../components/Trips/TripCoverMsg';
import TripCitySection from '../../../components/Trips/TripCitySection';
import TripDaysSection from '../../../components/Trips/TripDaysSection';

// Material UI
import { Container, Grid, Box } from '@material-ui/core';

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
            <Container maxWidth="sm" sx={{ margin: "0 auto"}}></Container>
            <TripCoverMsg {...trip}/>


          <>
            {trip.destination.map((oneDestination, index) => {
              return <TripCitySection key={oneDestination._id} {...oneDestination} index={index}/>
            })}
          </>

          <>
            {trip.days.map((oneDay, index) => {
              return <TripDaysSection key={oneDay._id} {...oneDay} index={index}/>
            })}
          </>
          </main>
        </>
      )}
    </>
  );
}

export default TripDetailsPage;
