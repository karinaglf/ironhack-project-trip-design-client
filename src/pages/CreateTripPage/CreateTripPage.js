import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../context/auth.context';
import {
  TextField,
  FormGroup,
  Button,
  Input,
} from '@material-ui/core';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import authService from '../../services/auth.service';
import fileService from '../../services/file.service';

const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005';

function CreateTripPage() {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  //Form Initial Values
  const initialValues = {
    tripName: '',
    coverImg: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800',
    createdBy: user._id,
    requestBy: '',
    startDate: '',
    endDate: '',
    duration: 0,
    pax: 1,
    coverMsg: ''
  };

  //Handle Submit
  const handleSubmit = async (values, formikHelpers) => {
    try {
      await axios.post(`${API_URL}/api/trips`, values);
      
      console.log(`Request Body`, values);
      console.log(formikHelpers);
      
      navigate("/profile");
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

      setFieldValue('coverImg', response.data.secure_url);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Create a Trip Page</h2>
      {user && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, errors, isSubmitting, isValidating, setFieldValue }) => (
          <Form>
            <FormGroup row={false}>
              <Field name="tripName" as={TextField} label="Trip Name" />
              <Input
                type="file"
                as={TextField}
                name="coverImg"
                onChange={(e) => handleFileUpload(e, setFieldValue)}
              />
              <Field name="coverMsg" as={TextField} label="Cover Message" />
            </FormGroup>
            <FormGroup row={true}>
              <Field name="startDate" as={TextField} label="Start Date" />
              <Field name="endDate" as={TextField} label="End Date" />
              <Field name="duration" as={TextField} label="Duration" />
              <Field name="pax" as={TextField} label="# Travelers" />
            </FormGroup>
            <Button type="submit" disabled={isSubmitting || isValidating}>
              Submit
            </Button>
            <pre>{JSON.stringify(errors, null, 6)}</pre>
            <pre>{JSON.stringify(values, null, 6)}</pre>
          </Form>
        )}
      </Formik>)}
    </div>
  );
}

export default CreateTripPage;
