import { Box, Avatar, Grid , Button } from '@material-ui/core';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005';

function DestinationsSection({ city, index }) {
  const [cities, setCities] = useState([]);

  const getAllItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/cities`);
      setCities(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '900px',
        }}
      >
        <h2>Our Destinations</h2>
        <p
          style={{
            fontSize: '1.2rem',
            lineHeight: '1.6',
            textAlign: 'center',
            maxWidth: '800px',
          }}
        >
          We’re niche travel planners who are destination specialists and food lovers. <br />We tailor-made trip itineraries in destinations that share a sense of place, vibrant food cultures, and creative scenes. 
        </p>
        <Grid container spacing={10} alignItems="center" justifyContent="center" style={{margin:'30px'}}>
          {cities.map((item) => (
            <Grid key={item._id} item xs={6} md={3}>
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Avatar
                  alt={item.name}
                  src={item.img}
                  style={{ width: 160, height: 160 }}
                ></Avatar>
                <h3>{item.name}</h3>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Link to="/signup">
        <Button size="large" variant="contained" color="primary">
          Start Planning
        </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default DestinationsSection;
