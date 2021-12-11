import { useState, useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import {
  Card,
  CardContent,
  Grid,
  TextField,
  FormGroup,
  Button
} from '@material-ui/core';
import { Form, Formik, Field } from 'formik';
import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005';

function CreateTripPage() {
  const [id, setId] = useState('');
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

  return (
    <div>
      <h2>Create a Trip Page</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, errors, isSubmitting, isValidating }) => (
          <Form>
            <FormGroup row={false}>
              <Field name="tripName" as={TextField} label="Trip Name" />
              <Field name="coverImg" as={TextField} label="Cover Img Url" />
              <Field name="createdBy" as={TextField} label="Created By" value={id}/>
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
