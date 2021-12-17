import AccommodationsList from '../../components/ItemsUI/AccommodationsList';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Grid, Box } from '@material-ui/core';
import userService from '../../services/user.service';
import { AuthContext } from '../../context/auth.context';
import { useState, useEffect, useContext } from 'react';


function AccommodationsPage() {
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
            <Sidebar isAdmin={isAdmin} />
          </Grid>
          <Grid item xs={12} md={10}>
            <Box sx={{ margin: '0 auto' }}>
              <AccommodationsList />
            </Box>
          </Grid>
        </Grid>
      </main>
    );
}

export default AccommodationsPage;