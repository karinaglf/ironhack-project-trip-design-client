import { useState, useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import {
    Card,
    CardContent,
    Grid,
    TextField,
    FormGroup,
    Button,
    Input
} from '@material-ui/core';
import { Form, Formik, Field } from 'formik';
import axios from "axios";
import authService from "../../services/auth.service";
import fileService from "../../services/file.service";

const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005';

function CreateTripPage() {
  const [ img, setImg] = useState('');
  const { user } = useContext(AuthContext);
  

  //Form Initial Values
  const initialValues = {
    tripName: '',
    coverImg: '',
    createdBy: '',
  };

  //Handle Submit
  const handleSubmit = async (values, formikHelpers) => {
    try {
        
        await axios.post(`${API_URL}/api/trips`, values)
        
        console.log(`Request Body`, values);
        console.log(formikHelpers)
        console.log("----------")
    } catch (error) {
        console.log("Error while submiting form")
    }
  };

 // Handle File Upload
  const handleFileUpload = async (e, setFieldValue) => {
    try {
      const uploadData = new FormData();

      uploadData.append("imageUrl", e.target.files[0]); // <-- set the file in the form

      const response = await fileService.uploadImage(uploadData);

    //  setImg(response.data.secure_url);
     
     setFieldValue("coverImg", response.data.secure_url);

    } catch (error) {
      console.log(error);
    }


  };

  return (
    <div>
      <h2>Create a Trip Page</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, errors, isSubmitting, isValidating, handleChange, setFieldValue }) => (
          <Form>
            <FormGroup row={false}>
              <Field name="tripName" as={TextField} label="Trip Name" />
              <Input type="file" as={TextField} name="coverImg" onChange={(e) => handleFileUpload(e, setFieldValue)}/>
              <Field name="createdBy" as={TextField} label="Created By" />
            </FormGroup>
          <Button type="submit" disabled={isSubmitting || isValidating}>Submit</Button>
            <pre>{JSON.stringify(errors, null, 6)}</pre>
            <pre>{JSON.stringify(values, null, 6)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateTripPage;
