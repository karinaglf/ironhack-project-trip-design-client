import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import TripsCard from '../../components/Trips/TripCard';
import userService from '../../services/user.service';
import Sidebar from '../../components/Sidebar/Sidebar';
import RequestsList from '../../components/Requests/RequestsList';

// Material UI
import { Grid, Button, Paper, Box } from '@material-ui/core';

function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasRequestedTrips, setHasRequestedTrips] = useState(false);

  const getUserInfo = async () => {
    try {
      const response = await userService.currentUser();
      setCurrentUser(response.data);

      if (response.data.role === 'admin') {
        setIsAdmin(true);
      }
      if (response.data.requestedTrips.length > 0) {
        setHasRequestedTrips(true);
      }
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

  console.log(currentUser);
  console.log(isAdmin);
  console.log(`hasTrips`, hasRequestedTrips);

  return (
    <main>
    <div className='container'></div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={2}>
        <aside className="drawer">
          <Sidebar isAdmin={isAdmin} /></aside>
        </Grid>
        <Grid item xs={12} md={10}>
          <Box sx={{ margin: '0 auto' }}>
            {currentUser && (
              <h2 style={{ textAlign: 'left' }}>Hello {currentUser.name}</h2>
            )}

            {currentUser && isAdmin ? (
              <>
                {/* Admin Section */}
                <div>
                <RequestsList />
                <h2 style={{ textAlign: 'left' }}>Latest Trips Planned</h2>
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
            ) : (
              // Customer Section
              <>
                <div>
                  {hasRequestedTrips ? (
                    <>
                      <div>
                        <Grid container spacing={6}>
                          {currentUser.requestedTrips.map((oneTrip) => (
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
                  ) : (
                    <>
                      <p>You don't have any trips yet</p>
                    </>
                  )}
                </div>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </main>
  );
}

export default ProfilePage;
