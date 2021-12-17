import Sidebar from "../../../components/Sidebar/Sidebar"
import { Grid, Button, Paper, Box } from '@material-ui/core';
import AddTripForm from "../../../components/Trips/AddTripForm";
import userService from '../../../services/user.service';
import { AuthContext } from '../../../context/auth.context';
import { useState, useEffect, useContext } from 'react';

const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005';

function CreateTripPage() {
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const response = await userService.currentUser();
      setCurrentUser(response.data);

      if (response.data.role === 'admin') {
        setIsAdmin(true);
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
      <main>
      
        <Grid container spacing={2}>
          <Grid item xs={12} md={2}>
            <Sidebar isAdmin={isAdmin}/>
          </Grid>
          <Grid item xs={12} md={10}>
          <Box sx={{margin: '0 auto'}}>
          <AddTripForm />
          </Box>
          </Grid>
        </Grid>
       
  
      </main>
  );
}

export default CreateTripPage;
