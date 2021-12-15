import { Container, Grid, Typography, Box, List, ListItem, Divider, ListItemText } from '@material-ui/core';
import { ListItemButton, ListItemIcon } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import MapIcon from '@mui/icons-material/Map';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { flexbox } from '@mui/system';
import { chainPropTypes } from '@mui/utils';



function TripHero({tripName, coverImg, pax, destination, duration, ...props }) {

 let cities = destination.map(element => {
    return element.city.name
  })

    const styleContainer = {
        height: 580,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        boxShadow: "inset 0 0 0 2000px rgba(32, 32,34, 0.3)"
    }
    return ( 
        <Box fullWidth sx={{...styleContainer, backgroundImage: `url(${coverImg})`
        }}
      >
        <h1 style={{fontSize: "4rem", color:"white"}}>{tripName}</h1>
        <Box sx={{ width: '100%', maxWidth: 680, bgcolor: 'background.paper', display: 'flex', padding: '20px 0', borderRadius: '10px' }}>
        <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12} md={3} align="center">
        <ListItem alignItems="center" disablePadding>
              <ListItemIcon>
                <EventAvailableIcon />
              </ListItemIcon>
              <ListItemText primary={`${duration} days`} />
          </ListItem>
        </Grid>
        <Grid item xs={12} md={6}>
        <ListItem  alignItems="center">
              <ListItemIcon>
                <MapIcon />
              </ListItemIcon>
              <ListItemText primary={cities.join(', ')} />
          </ListItem>
        </Grid>
        <Grid item xs={12} md={3}>
        <ListItem alignItems="center">
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary={`${pax} travelers`} />
          </ListItem>
        </Grid>
        </Grid>
      </Box>
      </Box>
     );
}

export default TripHero;