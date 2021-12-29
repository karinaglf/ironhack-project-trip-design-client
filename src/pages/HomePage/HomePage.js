// Material UI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@mui/material/Box';
import HeroImg from '../../assets/hero-6.jpg';
import TripDesign from '../../assets/img-travel-memories.png';
import { Link} from 'react-router-dom';
import VerticalStepper from '../../components/Homepage/VerticalStepper'
import DestinationsSection from '../../components/Homepage/DestinationsSection';

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
          What about an amazing vacation customized just for you? Request a trip plan, we do the hard work, you enjoy it!
        </h2>
        <Link to="/signup">
        <Button variant="contained" size="large" color="primary">
          Plan my trip
        </Button>
        </Link>
      </Box>
      <Box sx={{ m:10}}>
        <h2>How does it works</h2>
        <Grid
        className='how-works'
          container
          styles={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '50px' }}
          spacing={5}
        >
          <Grid item xs={12} md={6} display={{ xs: "none"}}>
            <img alt='trip design' src={TripDesign} />
          </Grid>
          <Grid item xs={12} md={6}>
            <p
              style={{
                fontSize: '1.3rem',
                lineHeight: '1.6',
                textAlign: 'left',
                marginTop: '80px',
              }}
            >
              You earned your vacation. Take the stress and uncertainty out of
              planning it by letting us make a trip guide just for you,
              providing expertise and up-to-date travel trends from around the
              world.
            </p>
            <VerticalStepper />
          </Grid>
        </Grid>
      </Box>

      <DestinationsSection /> 

    </>
  );
}

export default HomePage;
