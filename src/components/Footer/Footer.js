import { Typography, Box, Container } from '@material-ui/core';

export default function Footer() {
  return (
    <>
        <Container maxWidth="md" position="static" color="white">
          <Box sx={{display: 'flex', justifyContent: 'center', margin: '80px' }}>
            <Typography variant="body1">
              © 2021 Developed by Karina Freitas 
            </Typography>
          </Box>
        </Container>
    </>
  );
}
