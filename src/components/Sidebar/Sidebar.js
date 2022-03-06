import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ListItem, List, ListItemText } from '@material-ui/core';
import { Button } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import AddItemDialog from '../../components/ItemsUI/AddItemDialog'
import { Divider } from '@mui/material';


function Sidebar({ isAdmin }) {
  const [isUpdated, setIsUpdated] = useState(false);

  return (
    <>
      <div className="sidebar">
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          {!isAdmin && (
            <>
              <Link to={'/request-trip'}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#4050B5', marginBottom: '30px' }}
                  endIcon={<ChevronRight />}
                >
                  Request Trip
                </Button>
              </Link>

              <ListItem>
                <Link to={'/profile'}>
                  <ListItemText primary="Profile" />
                </Link>
              </ListItem>

              <ListItem>
                <Link to={'/'}>
                  <ListItemText primary="Travel Tips" />
                </Link>
              </ListItem>

              <ListItem>
                <Link to={'/'}>
                  <ListItemText primary="Checklist" />
                </Link>
              </ListItem>

              <ListItem>
                <Link to={'/'}>
                  <ListItemText primary="Resources" />
                </Link>
              </ListItem>
            </>
          )}

          {isAdmin && (
            <>

            <Link to={'/add-trip'}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#4050B5', width:'210px', marginBottom: '10px'}}
                  endIcon={<ChevronRight />}
                >
                  Create a Trip
                </Button>
              </Link>
              <AddItemDialog type={'accommodations'} isUpdated={isUpdated} setIsUpdated={setIsUpdated}/>
              <AddItemDialog type={'experiences'} isUpdated={isUpdated} setIsUpdated={setIsUpdated}/>
              <AddItemDialog type={'cities'} isUpdated={isUpdated} setIsUpdated={setIsUpdated}/>


              <ListItem style={{marginTop: '20px'}}>
                <Link to={'/'}>
                  <ListItemText primary="Trips" />
                </Link>
              </ListItem>

              <ListItem>
                <Link to={'/cities'}>
                  <ListItemText primary="Destinations" />
                </Link>
              </ListItem>
              <ListItem>
                <Link to={'/accommodations'}>
                  <ListItemText primary="Accommodations" />
                </Link>
              </ListItem>
              <ListItem>
                <Link to={'/experiences'}>
                  <ListItemText primary="Experiences" />
                </Link>
              </ListItem>
              <ListItem>
                <Link to={'/restaurants'}>
                  <ListItemText primary="Restaurants" />
                </Link>
              </ListItem>
              <ListItem>
                <Link to={'/restaurants'}>
                  <ListItemText primary="Customers" />
                </Link>
              </ListItem>
            </>
          )}
        </List>
      </div>
    </>
  );
}
export default Sidebar;
