import { Container, Grid, Typography, Box } from '@material-ui/core';
import { flexbox } from '@mui/system';


function TripHero({tripName, coverImg }) {
    
    const style = {
        height: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        boxShadow: "inset 0 0 0 2000px rgba(32, 32,34, 0.3)"
    }

    return ( 
        <Box fullWidth sx={{...style, backgroundImage: `url(${coverImg})`
        }}
      >
        <Typography variant="h2">{tripName}</Typography>
      </Box>
     );
}

export default TripHero;