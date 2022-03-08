import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Box, Grid } from '@material-ui/core';
import RequestsDetailsDialog from './RequestsDetailsDialog';

function RequestListCard({requestedBy, destination, status, _id, pax}) {

  let destinationArr
  if(destination){ destinationArr = destination.map(item => item.name)};

  return (
    <List disablePadding sx={{ width: '100%' }}>
      <Box className='border-list-card'>
      <ListItem>
      <Grid container justifyContent='space-between' alignItems='center'>
      <Grid item>
      <Box>
        <ListItemText primary={`${requestedBy?.name} Trip to ${destinationArr}`} secondary={`${pax} travelers`} />
        </Box>
        </Grid>
        <Grid item>
          <ListItemText sx={{paddingLeft: '5px' }} secondary={status.toUpperCase()} />
          <RequestsDetailsDialog _id={_id} destination={destinationArr}/>
        </Grid>
        </Grid>
      </ListItem>
      </Box>
      </List>
  );
}

export default RequestListCard
