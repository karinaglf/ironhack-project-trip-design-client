// src/pages/LoginPage.js

import axios from 'axios';
import { useState, useContext } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Paper, Grid, Box, Typography } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import TextField from '../../components/FormsUI/TextFieldWrapper';
import SubmitButton from '../../components/FormsUI/SubmitButtonWrapper';

const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005';

function LoginPage(props) {
  const [errorMessage, setErrorMessage] = useState(undefined);

  // Get the function for saving and verifying the token
  const { logInUser } = useContext(AuthContext);

  const navigate = useNavigate();

  //Form Initial Values
  const initialValues = {
    email: '',
    password: '',
  };

  //Form Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string().email().required('Insert a valid email'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values) => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.post(`${API_URL}/auth/login`, values, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      // Save the token and set the user as logged in ...
      const token = response.data.authToken;
      logInUser(token);
      console.log(`logInUser`, logInUser);
      console.log(`token`, token);
      navigate('/');
    } catch (error) {
      console.log(error);
      // If the request resolves with an error, set the error message in the state
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
      }}
    >
      <Paper
        elevation={2}
        style={{
          padding: '50px',
          border: '1px solid lightgrey',
          margin: '0 auto',
          width: '600px',
        }}
      >
        <h1>Login</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, isSubmitting, isValidating, setFieldValue }) => (
            <Form>
              <Typography m={5}>{errorMessage}</Typography>
              <Grid container spacing={4} justifyContent="center" alignItems="">
                <Grid item xs={12}>
                  <TextField name="email" label="Email" />
                </Grid>
                <Grid item xs={12}>
                  <TextField name="password" label="Password" />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <SubmitButton>Submit Form</SubmitButton>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
        <p style={{ fontSize: '1.2rem', textAlign: 'center', margin: '20px' }}>
          Don't have an account yet?<Link to={'/signup'}> Sign Up</Link>
        </p>
      </Paper>
    </Box>
  );
}

export default LoginPage;
