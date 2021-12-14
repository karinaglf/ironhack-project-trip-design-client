import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import TripsCard from '../../components/Trips/TripCard';

// Material UI 
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005';

function ProfilePage() {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <div>
      <h1>Profile Page</h1>
      <h2>Hello {user.name}</h2>

      <Link to={`/add-trip`}>
        <Button>Create Trip</Button>
      </Link>


      <Link to={`/`}>
        <Button>See All Experiences</Button>
      </Link>

      <div>
        {user && (
          <>
            <img className="profile-img" src={user.image} alt="profile" />
            <Grid container spacing={6}>
            {user.createdTrips.map((oneTrip) => (
              <Grid key={oneTrip._id} item xs={6} md={3}>
                <TripsCard {...oneTrip} /> 
              </Grid>
            )
            )}
            </Grid>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
