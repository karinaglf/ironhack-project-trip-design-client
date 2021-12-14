import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CityCard from '../../../components/City/CityCard';


//Material UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Grid';

const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005';

function AllCitiesPage() {
const [cities, setCities] = useState([]);

const getAllCities = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/cities`);
      setCities(response.data);
    } catch(error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCities();
  }, [] );

  console.log(cities)

    return (
        <div>
            <Typography>All Cities Page</Typography>
            <Grid container spacing={6}>
            {cities.map((oneCity) => (
              <Grid key={oneCity._id} item xs={6} md={3}>
                <CityCard {...oneCity} /> 
              </Grid>
            )
            )}
            </Grid>
        </div> 
     );
}

export default AllCitiesPage;