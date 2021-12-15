import { Container, Grid, Typography, Box, List, ListItem, Divider, ListItemText } from '@material-ui/core';
import { ListItemButton, ListItemIcon } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import MapIcon from '@mui/icons-material/Map';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { flexbox } from '@mui/system';



function TripHero({tripName, coverImg, pax }) {
    
    const styleContainer = {
        height: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        boxShadow: "inset 0 0 0 2000px rgba(32, 32,34, 0.3)"
    }

    const styleListWrap = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }

    return ( 
        <Box fullWidth sx={{...styleContainer, backgroundImage: `url(${coverImg})`
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 'bold'}}>{tripName}</Typography>
        <Box sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper', display: 'flex' }}>
        <List style={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
          <ListItem disablePadding>
              <ListItemIcon>
                <EventAvailableIcon />
              </ListItemIcon>
              <ListItemText primary={tripName} />
          </ListItem>
          <ListItem disablePadding>
              <ListItemIcon>
                <MapIcon />
              </ListItemIcon>
              <ListItemText primary="Drafts" />
          </ListItem>
          <ListItem disablePadding>
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary={`${pax} travelers`} />
          </ListItem>
        </List>
    </Box>
        
      </Box>
     );
}

export default TripHero;