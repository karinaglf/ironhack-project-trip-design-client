import { Link } from 'react-router-dom';
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

function CityCard({ name, country, img, _id }) {

  const deleteCity = async () => {
    try {
      await axios.delete(`${API_URL}/api/cities/${_id}`);
    } catch (error) {
      console.log('Error while deleting city');
    }
  };

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        component="img"
        height="160"
        image={img}
        alt="trip cover"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={`/cities/${_id}`}>
          Details
        </Button>
        <Button size="small" href={`/cities/edit/${_id}`}>
          Edit
        </Button>
        <Button size="small" onClick={deleteCity}>
          Remove
        </Button>
      </CardActions>
    </Card>
  );
}

export default CityCard;