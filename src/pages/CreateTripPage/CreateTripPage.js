import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../context/auth.context';
import TextField from '../../components/FormsUI/TextFieldWrapper/TextFieldWrapper';
import SubmitButton from '../../components/FormsUI/ButtonWrapper/ButtonWrapper';
import Checkbox from '../../components/FormsUI/CheckboxWrapper/CheckboxWrapper';
import DatePicker from '../../components/FormsUI/DatePickerWrapper/DatePickerWrapper';
import Select from '../../components/FormsUI/SelectWrapper/SelectWrapper';

import {
  Button,
  FormGroup,
  Input,
  Typography,
  CircularProgress,
  Grid,
  Container,
  Box
} from '@material-ui/core';
import { Form, Formik, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import authService from '../../services/auth.service';
import fileService from '../../services/file.service';
import { string } from 'yup/lib/locale';
import { makeStyles } from '@material-ui/core/styles';

const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005';

function CreateTripPage() {
  const { user } = useContext(AuthContext);

  const countries = {
    AF: 'Afghanistan',
    AL: 'Albania',
    DZ: 'Algeria',
    AS: 'American Samoa',
    AD: 'Andorra',
    AO: 'Angola',
    AI: 'Anguilla',
    AG: 'Antigua and Barbuda',
    AR: 'Argentina',
    AM: 'Armenia',
    AW: 'Aruba',
    AU: 'Australia',
    AT: 'Austria',
    AZ: 'Azerbaijan',
    BS: 'Bahamas',
  };

  const navigate = useNavigate();

  const useStyles = makeStyles((theme) => ({
    formWrapper: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(8),
    },
  }));

  //Form Initial Values
  const initialValues = {
    tripName: '',
    coverImg: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800',
    // createdBy: user._id,
    requestedBy: '',
    startDate: '',
    endDate: '',
    duration: 0,
    pax: 1,
    coverMsg: '',
    destination: '',
    days: [{ experiences: [], restaurants: [] }],
  };

  //Form Validation Schema
  const validationSchema = Yup.object({
    tripName: Yup.string('Enter your email')
      .required('Trip Name is Required')
      .min(2, 'at least 2')
      .max(30, 'max 30 chars'),
  });

  //Handle Submit - RETURN THIS AFTER
  // const handleSubmit = async (values, { setSubmitting }) => {
  //   try {
  //     await axios.post(`${API_URL}/api/trips`, values);

  //     //console.log(`Request Body`, values);

  //     setSubmitting(false);
  //     navigate("/profile");

  //   } catch (error) {
  //     console.log('Error while submitting create a trip form');
  //   }
  // };

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  };

  // Handle File Upload
  const handleFileUpload = async (e, setFieldValue) => {
    try {
      const uploadData = new FormData();

      uploadData.append('imageUrl', e.target.files[0]); // <-- set the file in the form

      const response = await fileService.uploadImage(uploadData);

      setFieldValue('coverImg', response.data.secure_url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography>CREATE A TRIP - MATERIAL UI FORM</Typography>
        </Grid>
        <Grid item xs={12}>
          <Container maxWidth="md">
            <div className={''}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  isSubmitting,
                  isValidating,
                  setFieldValue,
                }) => (
                  <Form>
                    <Grid container spacing={2}>

                      <Grid item xs={12}>
                        <TextField name="tripName" label="Trip Name" />
                      </Grid>

                      <Grid item xs={6}>
                        <TextField name="requestedBy" label="Requested By" />
                      </Grid>

                      <Grid item xs={6}>
                        <TextField name="pax" label="# travelers" type="number" />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField name="coverMsg" label="Cover Message" multiline={true} rows={4} />
                      </Grid>

                      <Grid item xs={12}>
                        <Typography>Trip Details</Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Select name="destination" label="Country" options={countries}/>
                      </Grid>

                      <Grid item xs={6}>
                        <Select name="city" label="City" options={countries}/>
                      </Grid>

                      <Grid item xs={4}>
                        <DatePicker name="startDate" label="Start Date" />
                      </Grid>

                      <Grid item xs={4}>
                        <DatePicker name="endDate" label="End Date" />
                      </Grid>

                      <Grid item xs={4}>
                        <TextField name="duration" label="Duration" />
                      </Grid>

                      <Grid item xs={12}>
                        <Typography>Accommodation</Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography>Days</Typography>
                      </Grid>

                      <Grid item xs={12}>
                      <FieldArray name="days">
                  {({ push, remove }) => (
                    <React.Fragment>
                      {values.days.map((_, i) => (
                        <Box key={i} sx={{backgroundColor: '#f4f4f4', borderRadius: '20px', padding: '20px 20px 30px', margin: "20px 0"}}>
                          <Grid container spacing={1} justifyContent="center" alignItems="center">
                          <Grid item xs={12} spacing={3}>
                          <Typography>Day #{i+1}</Typography>
                          </Grid>
                          <Grid container xs={11} spacing={3}>
                          <Grid item xs={12}>
                            <TextField name={`days[${i}].experiences`} label="Experiences"/>
                          </Grid>
                          <Grid item xs={12}>
                            <TextField name={`days[${i}].restaurants`} label="Restaurants"/>
                          </Grid>
                          </Grid>
                          <Grid item xs={1}>
                            <Button onClick={() => remove(i)}>Delete</Button>
                          </Grid>
                        </Grid>
                        </Box>
                      ))}
                      <Grid item xs={12}>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() =>
                            push({ experiences: [], restaurants: [] })
                          }
                        >
                          Add Day
                        </Button>
                      </Grid>
                    </React.Fragment>
                  )}
                </FieldArray>

                      </Grid>

                      <Grid item xs={12}>
                        <Button>Submit Form</Button>
                      </Grid>
                        <pre>{JSON.stringify(errors, null, 6)}</pre>
                        <pre>{JSON.stringify(values, null, 6)}</pre>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </div>
          </Container>
        </Grid>
      </Grid>
      <hr />
      <hr />
      <hr />

      <Typography component="h1">Create Trip</Typography>
      {user && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            isValidating,
            setFieldValue,
          }) => (
            <Form>
              <FormGroup row={false}>
                <TextField name="tripName" label="Trip Name" />
                <Input
                  type="file"
                  name="coverImg"
                  onChange={(e) => handleFileUpload(e, setFieldValue)}
                  variant="outlined"
                />
                <hr />
              </FormGroup>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting || isValidating}
                startIcon={
                  isSubmitting ? <CircularProgress size="1rem" /> : undefined
                }
              >
                {isSubmitting ? 'Creating Trip' : 'Create Trip'}
              </Button>
              <pre>{JSON.stringify(errors, null, 6)}</pre>
              <pre>{JSON.stringify(values, null, 6)}</pre>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}

export default CreateTripPage;
