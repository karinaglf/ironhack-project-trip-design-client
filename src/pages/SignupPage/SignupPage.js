import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Formik, FieldArray } from 'formik';
import * as Yup from 'yup';
import { string } from 'yup/lib/locale';
import { email } from 'yup/lib/locale';
import { Paper, Grid } from '@material-ui/core';
import TextField from '../../components/FormsUI/TextFieldWrapper';
import SubmitButton from '../../components/FormsUI/SubmitButtonWrapper';

import authService from '../../services/auth.service';

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
    name: Yup.string().required('Your name is Required'),
    password: Yup.string().required('Your name is Required'),
    email: Yup.string().required('You should add a valid email'),
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
      
      const authToken = localStorage.getItem("authToken");
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
    <div className="SignupPage">
      <h1>Sign Up</h1>

      <Paper elevation="5" sx={{ p:5 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, isSubmitting, isValidating, setFieldValue }) => (
            <Form>
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
                  <pre>{JSON.stringify(errors, null, 6)}</pre>
                  <pre>{JSON.stringify(values, null, 6)}</pre>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>

      <form onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input type="text" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={handleName} />

        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={'/login'}> Login</Link>
    </div>
  );
}

export default SignupPage;
