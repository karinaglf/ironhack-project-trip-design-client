import { Box } from '@material-ui/core';

function TripCoverMsg({ coverMsg, ...props }) {
  return (
    <Box sx={{ pt: 8, pb: 6, maxWidth: '800px', margin: '0 auto' }}>
      <p style={{ fontSize: '1.2rem', lineHeight: '1.6', textAlign: 'center' }}>
        {coverMsg}
      </p>
      <hr
        style={{
          width: '20vw',
          marginTop: '50px',
          color: 'lightgrey',
          height: '0.5px',
        }}
      />
    </Box>
  );
}

export default TripCoverMsg;
