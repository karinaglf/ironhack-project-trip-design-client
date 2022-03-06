import { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from './ItemCard';
import AddItem from './AddItem';
import EditItem from './EditItem';
import { Grid, Button, Paper, Box } from '@material-ui/core';
import SearchBar from './SearchItem';
import AddItemDialog from './AddItemDialog';

const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005';

function AccommodationsList() {
  const [accommodations, setAccommodations] = useState([]);
  const [allAccommodations, setAllAccommodations] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  const getAllItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/accommodations`);
      setAccommodations(response.data);
      setAllAccommodations(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllItems();
  }, [isUpdated]);

  //Function - search foods from SearchFood,js
  const searchList = (queryString) => {
    const searchedItems = allAccommodations.filter((item) => {
      return item.name.toLowerCase().includes(queryString.toLowerCase());
    });

    setAccommodations(searchedItems);
  };

  return (
    <>
      <h2 style={{ textAlign: 'left' }}>Accommodations List</h2>
      <Box className="border-box">
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={9}>
            <SearchBar searchList={searchList}  type={'accommodations'}/>
          </Grid>
          <Grid item xs={3}>
            <AddItemDialog type={'accommodations'} isUpdated={isUpdated} setIsUpdated={setIsUpdated} />
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={2}>
        {accommodations.map((item) => (
          <Grid key={item._id} item xs={6} md={3}>
            <ItemCard
              key={item._id}
              {...item}
              setIsUpdated={setIsUpdated}
              isUpdated={isUpdated}
              type={'accommodations'}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default AccommodationsList;
