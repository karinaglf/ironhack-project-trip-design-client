import { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from './ItemCard';
import { Grid, Box } from '@material-ui/core';
import SearchBar from './SearchItem';
import AddItemDialog from './AddItemDialog';

const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005';

function CitiesList() {
  const [cities, setCities] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  const getAllItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/cities`);
      setCities(response.data);
      setAllCities(response.data);
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
    const searchedItems = allCities.filter((item) => {
      return item.name.toLowerCase().includes(queryString.toLowerCase());
    });

    setCities(searchedItems);
  };

  return (
    <>
      <h2 style={{ textAlign: 'left' }}>Cities List</h2>
      <Box className="border-box">
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={9}>
            <SearchBar searchList={searchList}  type={'cities'}/>
          </Grid>
          <Grid item xs={3}>
            <AddItemDialog type={'cities'} isUpdated={isUpdated} setIsUpdated={setIsUpdated} />
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={2}>
        {cities.map((item) => (
          <Grid key={item._id} item xs={6} md={3}>
            <ItemCard
              key={item._id}
              {...item}
              setIsUpdated={setIsUpdated}
              isUpdated={isUpdated}
              type={'cities'}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default CitiesList;
