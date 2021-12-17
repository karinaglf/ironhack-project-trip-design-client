import Sidebar from "../../../components/Sidebar/Sidebar"
import { Grid, Button, Paper, Box } from '@material-ui/core';
import RequestTripForm from "../../../components/Trips/RequestTripForm";

function RequestTripPage() {

  return (
      <main>
      
        <Grid container spacing={2}>
          <Grid item xs={12} md={2}>
            <Sidebar />
          </Grid>
          <Grid item xs={12} md={10}>
          <Box sx={{margin: '0 auto'}}>
          <RequestTripForm />
          </Box>
          </Grid>
        </Grid>
       
  
      </main>
  );
}

export default RequestTripPage;