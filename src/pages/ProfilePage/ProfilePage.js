import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import TripsCard from '../../components/Trips/TripCard';
import userService from '../../services/user.service';

// Material UI
import { Grid, Button, Paper, Box } from '@material-ui/core';

function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isUpdated, setIsUpdated] = useState(false);

  const getUserInfo = async () => {
    try {
      const response = await userService.currentUser();
      setCurrentUser(response.data);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    getUserInfo();
  }, [isUpdated]);

  console.log(currentUser)
  return (
    <main>

    {errorMessage && <p>{errorMessage}</p>}
    <div>
      <Grid container spacing={2}>
        <Grid alignItems='baseline' item xs={3}>
          <Box>Side Bar</Box>
        </Grid>
        <Grid item xs={9}>
          <Box>xs=6</Box>
          <Paper height="100%">xs=6</Paper>
        </Grid>
      </Grid>
    </div>

      <h1>Profile Page</h1>
      <Link to={`/add-trip`}>
        <Button>Create Trip</Button>
      </Link>
      
      {currentUser && (
      <>
      <h2>Hello {currentUser.name}</h2>
      
          <div>
            <Grid container spacing={6}>
              {currentUser.createdTrips.map((oneTrip) => (
                <Grid key={oneTrip._id} item xs={6} md={3}>
                  <TripsCard
                    {...oneTrip}
                    setIsUpdated={setIsUpdated}
                    isUpdated={isUpdated}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
          </>
          )}
    </main>
  );
}

export default ProfilePage;
