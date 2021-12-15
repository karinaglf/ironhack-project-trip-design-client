import { Box, Avatar, Grid } from '@material-ui/core';
import TripItemCard from './TripItemCard';

function TripCitySection({ city, accommodations }) {
  console.log(city);
  console.log(accommodations);

  return (
    <Box sx={{ pt: 2, pb: 2, maxWidth: '800px', margin: '0 auto' }}>
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
        <h2>{city.name}</h2>
        <p
          style={{ fontSize: '1.2rem', lineHeight: '1.6', textAlign: 'center' }}
        >
          {city.description}
        </p>
      </Box>
      <hr
        style={{
          width: '20vw',
          marginTop: '50px',
          color: 'lightgrey',
          height: '0.5px',
        }}
      />
          <div>
            <Grid container spacing={6}>
              {accommodations.map((item) => (
                <Grid key={item._id} item xs={6} md={3}>
                  <TripItemCard
                    {...item}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
    </Box>
  );
}

export default TripCitySection;
