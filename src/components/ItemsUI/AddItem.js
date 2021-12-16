import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Paper, Grid, Box, Typography, Input, Button } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '../FormsUI/TextFieldWrapper';
import SubmitButton from '../FormsUI/SubmitButtonWrapper';
import Select from '../FormsUI/SelectWrapper';
import fileService from '../../services/file.service';

const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005';

function AddExperience({ refreshList, type, setOpen}) {
  const [isUploaded, setIsUploaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [cities, setCities] = useState();

  const navigate = useNavigate();

  const typeCapitalized = type.charAt(0).toUpperCase() + type.slice(1)

  const getAllCities = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/cities`);

      let citiesObj = {};
      response.data.forEach((item) => {
        citiesObj[item._id] = item.name;
      });

      setCities(citiesObj);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCities();
  }, []);

  //Form Initial Values
  const initialValues = {
    name: '',
    description: '',
    category: '',
    externalUrl: '',
    affiliateLink: '',
    img: 'https://images.unsplash.com/photo-1525875098832-46c7d9d0794e',
    city: '',
  };

  //Form Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().required('Insert a name'),
  });

  //Handle Submit
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post(`${API_URL}/api/${type}`, values);

      //console.log(`Request Body`, values);

      setSubmitting(false);
      setOpen(false);
      refreshList();
    } catch (error) {
      console.log('Error while submitting create a trip form');
    }
  };

  // Handle File Upload
  const handleFileUpload = async (e, setFieldValue) => {
    try {
      const uploadData = new FormData();

      uploadData.append('imageUrl', e.target.files[0]); // <-- set the file in the form

      const response = await fileService.uploadImage(uploadData);

      setFieldValue('img', response.data.secure_url);
      setIsUploaded('true');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {cities && (
        <>
            <h2>Add {typeCapitalized} </h2>
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
                  <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12}>
                      <TextField name="name" label="Name" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField name="description" label="Description" />
                    </Grid>
                    <Grid item xs={12}>
                      <Select name="city" label="City" options={cities} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField name="category" label="Category" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField name="externalUrl" label="Website" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField name="affiliateLink" label="Affiliate Link" />
                    </Grid>
                    <Input
                      type="file"
                      name="img"
                      onChange={(e) => handleFileUpload(e, setFieldValue)}
                      style={{ display: 'none' }}
                      id="button-file"
                    />
                    <label htmlFor="button-file">
                      <Button
                        variant="outlined"
                        component="span"
                        className={''}
                      >
                        Upload Image
                      </Button>
                    </label>
                    <Grid
                      item
                      xs={12}
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <SubmitButton>Submit</SubmitButton>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
            </>
      )}
    </>
  );
}

export default AddExperience;