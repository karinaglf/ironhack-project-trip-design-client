// Material UI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@mui/material/Box';
import Typography from '@material-ui/core/Typography';
import HeroImg from '../../assets/hero-6.jpg';
import TripDesign from '../../assets/img-travel-memories.png';
import { Link, useNavigate } from 'react-router-dom';

const styleContainer = {
  height: 650,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'bottom center',
  boxShadow: 'inset 0 0 0 2000px rgba(32, 32,34, 0.3)',
  border: '1px solid black',
};



function HomePage() {
  return (
    <>
      <Box
        fullWidth
        sx={{
          height: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          boxShadow: 'inset 0 0 0 2000px rgba(32, 32,34, 0.3)',
          border: '1px solid black',
          backgroundImage: `url(${HeroImg})`,
        }}
      >
        <h1 style={{ fontSize: '4rem', color: 'black' }}>
          Customize your trip
        </h1>
        <h2 style={{ maxWidth: '800px', marginTop: '-10px' }}>
          Go on a fabulous vacation planned just for you, and let us do all the
          work
        </h2>
        <Link to="/signup">
        <Button variant="contained" color="primary">
          Plan my trip
        </Button>
        </Link>
      </Box>
      <Box styles={{padding: '80px'}}>
        <h2>How does it works</h2>
        <Grid
          container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            m: 10 }}
          spacing={5}
          styles={{marginTop:'80px'}}
        >
          <Grid item xs={6}>
            <img alt='trip design' src={TripDesign} />
          </Grid>
          <Grid item xs={6}>
            <p
              style={{
                fontSize: '1.2rem',
                lineHeight: '1.6',
                textAlign: 'center',
              }}
            >
              You earned your vacation. Take the stress and uncertainty out of
              planning it by letting us make a trip guide just for you,
              providing expertise and up-to-date travel trends from around the
              world.
            </p>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default HomePage;
