import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import TripsCard from '../../components/TripsCard/TripsCard';

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
      <h2>Hello </h2>

      <Link to={`/create-trip`}>
        <Button>Create Trip</Button>
      </Link>

      <div>
        {user && (
          <>
            <img className="profile-img" src={user.image} alt="profile" />
            <p>{user.email}</p>
            <p>{user.name}</p>
            <Grid container spacing={6} justify="center">
            {user.createdTrips.map((oneTrip) => (
              <Grid item xs={6} md={3}>
                <TripsCard key={oneTrip._id} {...oneTrip} /> 
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
