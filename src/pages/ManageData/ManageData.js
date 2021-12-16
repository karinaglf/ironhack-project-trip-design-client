import ExperiencesList from "./Experiences/ExperiencesList";
import { Grid, Button, Paper, Box } from '@material-ui/core';


function ManageData() {



  return (
    <main>
    <h1>Manage Data</h1>

    <Grid container spacing={2}>
        <Grid item xs={3}>
          <Box>Side Bar</Box>
        </Grid>
        <Grid item xs={9}>
            <ExperiencesList />
        </Grid>
      </Grid>
     

    </main>
  );
}

export default ManageData;
