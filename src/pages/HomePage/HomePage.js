// Material UI 
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { Link, useNavigate } from 'react-router-dom';


function HomePage() {
  return (
    <div>
      <Typography>Home Page</Typography>

      <hr / >
      <Typography>Trips</Typography>
      <Link to={`/add-trip`}>
        <Button>Add a Trip</Button>
      </Link>
      <Link to={`/trips`}>
        <Button>All Trips</Button>
      </Link>

      <Typography>Experiences</Typography>
      <Link to={`/add-experience`}>
        <Button>Add Experience</Button>
      </Link>
      <Link to={`/experiences`}>
        <Button>All Experiences</Button>
      </Link>

      <Typography>Accommodations</Typography>
      <Link to={`/add-accommodation`}>
        <Button>Add Accommodation</Button>
      </Link>
      <Link to={`/create-trip`}>
        <Button>All Experiences</Button>
      </Link>

      <Typography>Cities</Typography>
      <Link to={`/add-city`}>
        <Button>Add a City</Button>
      </Link>
      <Link to={`/cities`}>
        <Button>All Cities</Button>
      </Link>




    </div>

  );
}

export default HomePage;