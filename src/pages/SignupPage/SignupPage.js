import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Formik} from 'formik';
import * as Yup from 'yup';
import { Paper, Grid, Box, Typography } from '@material-ui/core';
import TextField from '../../components/FormsUI/TextFieldWrapper';
import SubmitButton from '../../components/FormsUI/SubmitButtonWrapper';

const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005';

function SignupPage(props) {
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  //Form Initial Values
  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  //Form Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().required('Your name is required'),
    email: Yup.string().email().required("Insert a valid email"),
    password: Yup.string().required('Password is required').min(8, "Password must contain at least 8 characters, 1 uppercase and 1 symbol"),
  });

  const handleSubmit = async (values) => {
    try {
      const authToken = localStorage.getItem('authToken');
      await axios.post(`${API_URL}/auth/signup`, values, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      // If the request is successful navigate to login page
      navigate('/login');
    } catch (error) {
      // If the request resolves with an error, set the error message in the state
      setErrorMessage('Something went wrong');
    }
  };

  return (
    <main>
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
        <Paper
          elevation={2}
          style={{
            padding: '50px',
            border: '1px solid lightgrey',
            margin: '0 auto',
            width: '600px'
          }}
        >
          <h1>Sign Up</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              isSubmitting,
              isValidating,
              setFieldValue,
            }) => (
              <Form>
                <Typography m={5}>{errorMessage}</Typography>
                <Grid container spacing={4} justifyContent='center' alignItems=''>
                  <Grid item xs={12}>
                    <TextField name="name" label="First Name" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField name="email" label="Email" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField name="password" label="Password" />
                  </Grid>
                  <Grid item xs={12} style={{display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
                    <SubmitButton>Submit Form</SubmitButton>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
          <p style={{ fontSize: '1.2rem', textAlign: 'center', margin: '20px' }}>
          Don't have an account yet?<Link to={'/login'}> Login</Link>
        </p>
        </Paper>
      </Box>
      </main>
  );
}

export default SignupPage;
