import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Box, Grid, Button } from '@material-ui/core';
import ImageIcon from '@mui/icons-material/Image';
import RequestsDetailsDialog from './RequestsDetailsDialog';

function RequestListCard({requestedBy, destination, timestamp, status, _id, pax}) {
  console.log(`requestedBy`, requestedBy)

  let destinationArr
  if(destination){ destinationArr = destination.map(item => item.name)};


  return (
    <List disablePadding sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Box className='border-list-card'>
      <ListItem>
      <Grid container justifyContent='space-between' alignItems='center'>
      <Grid item>
      <Box>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`${requestedBy?.name} Trip to ${destinationArr}`} secondary={`${pax} travelers`} />
        </Box>
        </Grid>
        <Grid item>
          <RequestsDetailsDialog _id={_id}/>
        </Grid>
        </Grid>
      </ListItem>
      </Box>
      </List>
  );
}

export default RequestListCard
