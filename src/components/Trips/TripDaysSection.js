import { Box, Avatar, Grid } from '@material-ui/core';
import TripItemCard from './TripItemCard';

function TripDaysSection({ experiences, index }) {

  return (
    <Box sx={{ pt: 2, pb: 2, margin: '0 auto', mt: 5, mb: 5 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >

        <h2>Day {index +1}</h2>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <h2>Experiences Selection</h2>
        <p
          style={{ fontSize: '1.2rem', lineHeight: '1.6', textAlign: 'center', maxWidth: '800px'}}
        >
          Our special curated list for experiences in.
        </p>
            <Grid container spacing={6}   alignItems="center"  justifyContent="center">
              {experiences.map((item) => (
                <Grid key={item._id} item xs={6} md={3}>
                  <TripItemCard
                    {...item}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

         </Box>
    </Box>
  );
}

export default TripDaysSection;