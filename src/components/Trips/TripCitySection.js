import { Box, Avatar, Grid } from '@material-ui/core';
import TripItemCard from './TripItemCard';

function TripCitySection({ city, accommodations, index}) {
  console.log(city);
  console.log(accommodations);

  return (
    <>
    {city && (
    <Box sx={{ pt: 2, pb: 2, margin: '0 auto', mt: 5, mb: 5 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Avatar
          alt={city.name}
          src={city.img}
          style={{ width: 160, height: 160 }}
        ></Avatar>
        <h2>Destination #{index + 1}: {city.name}</h2>
        <p
          style={{ fontSize: '1.2rem', lineHeight: '1.6', textAlign: 'center', maxWidth: '800px'}}
        >
          {city.description}
        </p>
      <hr
        style={{
          width: '20vw',
          margin: '50px 0',
          color: 'lightgrey',
          height: '0.5px',
        }}
      />
      </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <h2>Accommodation Selection</h2>
        <p
          style={{ fontSize: '1.2rem', lineHeight: '1.6', textAlign: 'center', maxWidth: '800px'}}
        >
          Our special curated list for {city.name} that you will definitely love.
        </p>
            <Grid container spacing={6}   alignItems="center"  justifyContent="center">
              {accommodations.map((item) => (
                <Grid key={item._id} item xs={6} md={3}>
                  <TripItemCard
                    {...item}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          
    </Box>
    )}
    </>
  );
}

export default TripCitySection;
