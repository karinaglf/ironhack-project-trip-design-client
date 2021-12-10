import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import TripsCard from '../../components/TripsCard/TripsCard';

// Material UI 
import Button from '@material-ui/core/Button';

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
            {user.createdTrips.map((oneTrip) => (
              <TripsCard key={oneTrip._id} {...oneTrip} /> 
            )
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
