import { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from '../../components/ItemsUI/ItemCard';
import AddItem from '../../components/ItemsUI/AddItem';
import EditItem from '../../components/ItemsUI/EditItem';
import { Grid, Button, Paper, Box } from '@material-ui/core';
import SearchBar from '../../components/ItemsUI/SearchItem';
import AddItemDialog from '../../components/ItemsUI/AddItemDialog';

const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005';

function ExperiencesList() {
  const [experiences, setExperiences] = useState([]);
  const [allExperiences, setAllExperiences] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  const getAllItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/experiences`);
      setExperiences(response.data);
      setAllExperiences(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllItems();
  }, []);

  useEffect(() => {
    getAllItems();
  }, [isUpdated]);

  //Function - search foods from SearchFood,js
  const searchList = (queryString) => {
    const searchedItems = allExperiences.filter((item) => {
      return item.name.toLowerCase().includes(queryString.toLowerCase());
    });

    setExperiences(searchedItems);
  };

  return (
    <>
      <h2 style={{ textAlign: 'left' }}>Experiences List</h2>
      <Box className="border-box">
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={9}>
            <SearchBar searchList={searchList} />
          </Grid>
          <Grid item xs={3}>
            <AddItemDialog type={'experiences'} refreshList={getAllItems} />
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={2}>
        {experiences.map((item) => (
          <Grid key={item._id} item xs={6} md={3}>
            <ItemCard
              key={item._id}
              {...item}
              setIsUpdated={setIsUpdated}
              isUpdated={isUpdated}
              type={'experiences'}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default ExperiencesList;
