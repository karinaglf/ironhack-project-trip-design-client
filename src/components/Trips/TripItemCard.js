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

function TripItemCard({ name, category, description, externalUrl, img, affiliateLink, _id }) {
  
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
          <Button size="small" href={externalUrl}>
            Book
          </Button>
        </CardActions>
      </Card>
    );
  }
  
  export default TripItemCard;
  