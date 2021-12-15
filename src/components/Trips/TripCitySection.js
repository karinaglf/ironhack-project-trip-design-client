import { Box, Divider, Avatar } from '@material-ui/core';

function TripCitySection( {city} ) {
    console.log(city)



    return ( 
        <Box sx={{ pt: 2, pb: 2, maxWidth: '800px', margin: '0 auto' }}>
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Avatar alt={city.name} src={city.img} style={{ width: 160, height: 160 }}></Avatar>
        <h2>{city.name}</h2>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', textAlign: 'center' }}>
        {city.description}
        </p>
        </Box>
        <Divider textAlign='center' style={{width: '40vw', marginTop: '20px' }}
        />
      </Box>
     );
}

export default TripCitySection;