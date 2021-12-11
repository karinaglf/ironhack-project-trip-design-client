import { Link } from 'react-router-dom';
import tripsService from '../../services/file.service';
import axios from 'axios';

// Material UI
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
} from '@material-ui/core';

const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005';

function TripsCard({ tripName, _id, coverImg }) {


  const deleteTrip = async () => {
    try {
      console.log('Clicked');
      await axios.delete(`${API_URL}/api/trips/${_id}`);

      console.log(`ID OF TRE TRIP`, _id);
      console.log('----------');
    } catch (error) {
      console.log('Error while deleting trip');
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="160"
        image={coverImg}
        alt="trip cover"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {tripName}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={`/trips/${_id}`}>
          Details
        </Button>
        <Button size="small" href={`/trips/edit/${_id}`}>
          Edit
        </Button>
        <Button size="small" onClick={deleteTrip}>
          Remove
        </Button>
      </CardActions>
    </Card>
  );
}

export default TripsCard;
