import { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import RequestListCard from './RequestsListCard';

const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005';

function RequestsList() {
  const [requests, setRequests] = useState([]);
  // const [allRequests, setAllRequests] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  const getAllItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/requests`);
      setRequests(response.data);
      // setAllRequests(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(requests);

  useEffect(() => {
    getAllItems();
  }, [isUpdated]);

  return (
    <>
      {requests && (
        <>
          <h2 style={{ textAlign: 'left' }}>Requests List - To Do's</h2>
          <Grid container spacing={2}>
            {requests.map((item) => (
              <Grid key={item._id} item xs={12}>
                <RequestListCard {...item} isUpdated={isUpdated} setIsUpdated={setIsUpdated}/>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
}

export default RequestsList;
