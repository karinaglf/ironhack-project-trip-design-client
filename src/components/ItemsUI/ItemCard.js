import { Link } from 'react-router-dom';
import tripsService from '../../services/file.service';
import axios from 'axios';
import EditFormDialog from './EditItemDialog';

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

function ItemCard({ type, name, category, description, externalUrl, img, affiliateLink, _id, setIsUpdated, isUpdated }) {

  const deleteItem = async () => {
    try {
      await axios.delete(`${API_URL}/api/${type}/${_id}`);
      setIsUpdated(!isUpdated);
    } catch (error) {
      console.log('Error while deleting item');
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
        <Button size="small" href={`/${type}/${_id}`}>
          Details
        </Button>
        <EditFormDialog type={`${type}`} id={_id}/>
        <Button size="small" onClick={deleteItem}>
          Remove
        </Button>
      </CardActions>
    </Card>
  );
}

export default ItemCard;