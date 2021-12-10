import { Link } from 'react-router-dom';

// Material UI 
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


function TripsCard( { tripName, _id, coverImg}) {
    return (
      <Link to={`/trips/${_id}`}>
        <Card sx={{ width: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={coverImg}
                alt="trip cover"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {tripName}
                </Typography>
              </CardContent>
            </Card>
    </Link>
    );
  }
  
  export default TripsCard;