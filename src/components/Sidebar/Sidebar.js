import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ListItem, List, ListItemText } from '@material-ui/core';
import { Button } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';

function Sidebar({ isAdmin }) {
  return (
    <>
      <div className="sidebar">
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          {!isAdmin && (
            <>
              <Link to={'/profile'}>
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

            <Link to={'/profile'}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#4050B5', marginBottom: '30px' }}
                  endIcon={<ChevronRight />}
                >
                  Dashboard
                </Button>
              </Link>

              <ListItem>
                <Link to={'/'}>
                  <ListItemText primary="Trips" />
                </Link>
              </ListItem>

              <ListItem>
                <Link to={'/destinations'}>
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
