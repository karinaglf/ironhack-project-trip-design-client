import { useState, useEffect } from 'react';
import axios from 'axios';
import TripItemCard from '../../../components/Trips/TripItemCard';
import AddExperience from '../../../components/Experiences/AddExperience';
import { Grid, Button, Paper, Box } from '@material-ui/core';

const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005';

function ExperiencesList() {
  const [experiences, setExperiences] = useState([]);

  const getAllItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/experiences`);
      setExperiences(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <Grid container spacing={2}>
              {experiences.map((item) => (
                <Grid key={item._id} item xs={6} md={4}>
                  <TripItemCard key={item._id} {...item} />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={3}>
            <AddExperience refreshList={getAllItems} />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default ExperiencesList;
