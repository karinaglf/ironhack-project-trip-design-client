import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Formik, FieldArray } from 'formik';
import * as Yup from 'yup';
import { string } from 'yup/lib/locale';
import { email } from 'yup/lib/locale';
import { Paper, Grid, Container, Box, Typography } from '@material-ui/core';
import TextField from '../../components/FormsUI/TextFieldWrapper';
import SubmitButton from '../../components/FormsUI/SubmitButtonWrapper';

import authService from '../../services/auth.service';
import { height, maxWidth } from '@mui/system';

const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005';

function SignupPage(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
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
    password: Yup.string().required('Password must contain at least 8 characters and 1 symbol'),
    email: Yup.string().required('Insert a valid email'),
  });

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = async (e) => {
    try {
      e.preventDefault();
      // Create an object representing the request body
      const requestBody = { email, password, name };

      await authService.signup(requestBody);

      // If the request is successful navigate to login page
      navigate('/login');
    } catch (error) {
      // If the request resolves with an error, set the error message in the state
      setErrorMessage('Something went wrong');
    }
  };

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
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
        <Paper
          elevation={5}
          style={{
            padding: '50px',
            border: '1px solid lightgrey',
            margin: '0 auto',
            width: '600px'
          }}
        >
          <Typography>Sign Up</Typography>
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
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <TextField name="name" label="First Name" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField name="email" label="Email" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField name="password" label="Password" />
                  </Grid>
                  <Grid item xs={12}>
                    <SubmitButton>Submit Form</SubmitButton>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
  );
}

export default SignupPage;
