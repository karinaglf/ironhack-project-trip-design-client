import Sidebar from "../../../components/Sidebar/Sidebar"
import { Grid, Button, Paper, Box } from '@material-ui/core';
import AddTripForm from "../../../components/Trips/AddTripForm";

const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005';

function CreateTripPage() {

  return (
      <main>
      
        <Grid container spacing={2}>
          <Grid item xs={12} md={2}>
            <Sidebar />
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
