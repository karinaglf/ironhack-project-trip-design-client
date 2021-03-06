import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../../context/auth.context';
import TextField from '../../../components/FormsUI/TextFieldWrapper';
import SubmitButton from '../../../components/FormsUI/SubmitButtonWrapper';
import DatePicker from '../../../components/FormsUI/DatePickerWrapper';
import Select from '../../../components/FormsUI/SelectWrapper';
import MultiSelect from '../../../components/FormsUI/MultiSelectWrapper';

import {
  Input,
  Button,
  Typography,
  Grid,
  Container,
  Box,
} from '@material-ui/core';
import { Form, Formik, FieldArray } from 'formik';
import * as Yup from 'yup';
import fileService from '../../../services/file.service';

const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005';

function EditTripPage() {
  const [trip, setTrip] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [cities, setCities] = useState();
  const [accommodations, setAccommodations] = useState();
  const [experiences, setExperiences] = useState();
  const [previewCover, setPreviewCover] = useState(
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800'
  );
  const { user } = useContext(AuthContext);

  const { tripId } = useParams();
  // Make an axios call when the component is created
  // and get the trip details from the server

  const getTrip = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/trips/${tripId}`);
      const oneTrip = response.data;
      setTrip(oneTrip);
    } catch (error) {
      console.log(error);
    }
  };

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

  const getAllAccommodations = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/accommodations`);

      let accommodationsObj = {};
      response.data.forEach((item) => {
        accommodationsObj[item._id] = item.name;
      });

      setAccommodations(accommodationsObj);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllExperiences = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/experiences`);

      let experiencesObj = {};
      response.data.forEach((item) => {
        experiencesObj[item._id] = item.name;
      });
      console.log(experiencesObj);

      setExperiences(experiencesObj);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrip();
    getAllCities();
    getAllAccommodations();
    getAllExperiences();
  }, []);

  const navigate = useNavigate();

  //Form Initial Values
  const initialValues = {
    tripName: trip?.tripName,
    coverImg: trip?.coverImg,
    startDate: trip?.startDate,
    endDate: trip?.endDate,
    duration: trip?.duration,
    pax: trip?.pax,
    coverMsg: trip?.coverMsg,
    createdBy: user?._id,
    destination: [
      {
        city: trip?.destination[0].city,
        accommodations: trip?.destination[0].accommodations,
      }
    ],
    days: [
      {
        experiences: [],
      },
    ],
  };

  //Form Validation Schema
  const validationSchema = Yup.object({
    tripName: Yup.string()
      .required('Trip Name is Required')
      .min(20, 'at least 20 chars')
      .max(40, 'max 40 chars'),
  });

  //Handle Submit - RETURN THIS AFTER
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.put(`${API_URL}/api/trips/${tripId}`, values);

      //console.log(`Request Body`, values);

      setSubmitting(false);
      navigate('/profile');
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
      setPreviewCover(response.data.secure_url);
      setIsUploaded('true');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {trip && cities && accommodations && experiences && (
        <Grid container>
          <Grid item xs={12}>
            <h1>Edit Trip</h1>
          </Grid>
          <hr />
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
                      <Grid container spacing={4}>
                        <Grid item xs={8}>
                          <Grid container xs={12} spacing={3}>
                            <Grid item xs={12}>
                              <TextField name="tripName" label="Trip Name" />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                name="requestedBy"
                                label="Requested By"
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                name="pax"
                                label="# travelers"
                                type="number"
                              />
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item xs={4}>
                          <Box>
                            <img
                              className=""
                              src={previewCover}
                              alt=""
                              height="180px"
                            />
                          </Box>
                          <Input
                            type="file"
                            name="coverImg"
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
                              {isUploaded
                                ? 'Edit cover image '
                                : 'Add custom cover image'}
                            </Button>
                          </label>
                        </Grid>
                        <hr />
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <h2>Trip Details</h2>
                          </Grid>

                          <Grid item xs={12}>
                            <TextField
                              name="coverMsg"
                              label="Cover Message"
                              multiline={true}
                              rows={4}
                            />
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
                        </Grid>

                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <h2>Destination</h2>
                          </Grid>

                          <Grid item xs={12}>
                            <FieldArray name="destination">
                              {({ push, remove }) => (
                                <>
                                  {values.destination.map((dest, i) => (
                                    
                                    <Box
                                      key={i}
                                      sx={{
                                        border: '1px solid #C4C4C4',
                                        borderRadius: '8px',
                                        padding: '20px 20px 30px',
                                        margin: '20px 0',
                                      }}
                                    >
                                      <Grid
                                        container
                                        spacing={3}
                                        justifyContent="center"
                                        alignItems="center"
                                      >
                                        <Grid item xs={12}>
                                          <Typography
                                            component="h3"
                                            sx={{ mb: 2, mr: 2 }}
                                          >
                                            <strong>City #{i + 1}</strong>
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={11}>
                                          <Grid item xs={12}>
                                            <Select
                                              name={`destination[${i}].city`}
                                              label="City"
                                              options={cities}
                                            />
                                          </Grid>
                                          <></>
                                          <Grid item xs={12}>
                                            <MultiSelect
                                              name={`destination[${i}].accommodations`}
                                              label="Accommodations"
                                              options={accommodations}
                                            />
                                          </Grid>
                                        </Grid>
                                        <Grid item xs={1}>
                                          <Button onClick={() => remove(i)}>
                                            Delete
                                          </Button>
                                        </Grid>
                                      </Grid>
                                    </Box>
                                  ))}
                                  <Grid item xs={12}>
                                    <Button
                                      variant="outlined"
                                      color="primary"
                                      onClick={() =>
                                        push({ city: [], accommodations: [] })
                                      }
                                    >
                                      Add New Destination
                                    </Button>
                                  </Grid>
                                </>
                              )}
                            </FieldArray>
                          </Grid>
                        </Grid>
                        <hr />

                        <hr />
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <h2>Day by Day</h2>
                          </Grid>

                          <Grid item xs={12}>
                            <FieldArray name="days">
                              {({ push, remove }) => (
                                <>
                                  {values.days.map((_, i) => (
                                    <Box
                                      key={i}
                                      sx={{
                                        border: '1px solid #C4C4C4',
                                        borderRadius: '8px',
                                        padding: '20px 20px 30px',
                                        margin: '20px 0',
                                      }}
                                    >
                                      <Grid
                                        container
                                        spacing={1}
                                        justifyContent="center"
                                        alignItems="center"
                                      >
                                        <Grid item xs={12} spacing={3}>
                                          <Typography component="h3">
                                            Day #{i + 1}
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={11} spacing={3}>
                                          <Grid item xs={12}>
                                            <MultiSelect
                                              name={`days[${i}].experiences`}
                                              label="Experiences"
                                              options={experiences}
                                            />
                                          </Grid>
                                        </Grid>
                                        <Grid item xs={1}>
                                          <Button onClick={() => remove(i)}>
                                            Delete
                                          </Button>
                                        </Grid>
                                      </Grid>
                                    </Box>
                                  ))}
                                  <Grid item xs={12}>
                                    <Button
                                      variant="outlined"
                                      color="primary"
                                      onClick={() =>
                                        push({
                                          experiences: [],
                                          restaurants: [],
                                        })
                                      }
                                    >
                                      Add New Day
                                    </Button>
                                  </Grid>
                                </>
                              )}
                            </FieldArray>
                          </Grid>
                        </Grid>
                        <hr />
                        <Grid container justifyContent="center">
                          <Grid item xs={12}>
                            <SubmitButton>Submit Form</SubmitButton>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </div>
            </Container>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default EditTripPage;
