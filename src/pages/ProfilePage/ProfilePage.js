import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import TripsCard from '../../components/Trips/TripCard';
import axios from 'axios';

// Material UI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005';

function ProfilePage() {
  const [isUpdated, setIsUpdated] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const { user } = useContext(AuthContext);
  // console.log(user);

  // GET /api/examples/:id
  const getUser = async () => {
    const response = await axios.get(`${API_URL}/api/users/`);
    setCurrentUser(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    // get user from db
    getUser();
  }, [isUpdated]);

  useEffect(() => {
    // get user from db
    getUser();
  }, []);

  return (
    <div>

      <h1>Profile Page</h1>
      <Link to={`/add-trip`}>
        <Button>Create Trip</Button>
      </Link>

      {currentUser && 
      <>
      <h2>Hello {currentUser.name}</h2>
      </>
      }
      <div>
        {user && (
          <>
            <img className="profile-img" src={user.image} alt="profile" />
            <Grid container spacing={6}>
              {user.createdTrips.map((oneTrip) => (
                <Grid key={oneTrip._id} item xs={6} md={3}>
                  <TripsCard
                    {...oneTrip}
                    setIsUpdated={setIsUpdated}
                    isUpdated={isUpdated}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
