import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../context/auth.context';
import TextField from '../FormsUI/TextFieldWrapper';
import SubmitButton from '../FormsUI/SubmitButtonWrapper';
import DatePicker from '../FormsUI/DatePickerWrapper';
import MultiSelect from '../FormsUI/MultiSelectWrapper';
import MultiSelectArray from '../FormsUI/MultiSelectWrapperArray';

import { Grid, Container, Box } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005';

const accommodationTypes = [
	'Luxury Hotels',
	'Simple and Cozy Inns',
	'Private House Apartments',
	'Boutique Stays',
	'Homestays with Local People',
	'Budget and Hostels',
];
const activitiesTypes = [
	'Cooking Class',
	'Unique Experiences',
	'Local Culture',
	'Rural Tourism',
	'Cocktails',
	'Food Tours',
	'Fine Dining',
	'Spa & Wellness',
	'Wine Tasting',
	'Shopping',
];

function RequestTripForm() {
	const [isUploaded, setIsUploaded] = useState(false);
	const [cities, setCities] = useState();
	const { user } = useContext(AuthContext);

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

	const navigate = useNavigate();

	//Form Initial Values
	const initialValues = {
		destination: '',
		requestedBy: user?._id,
		startDate: '',
		endDate: '',
		duration: 1,
		pax: 1,
		budgetPerPerson: '300',
		typeOfAccommodation: [],
		detailsOccasion: '',
		activitiesToInclude: [],
		specialRequest: '',
	};

	//Form Validation Schema
	const validationSchema = Yup.object({
		// destination: Yup.string().required(),
	});

	//Handle Submit
	const handleSubmit = async (values, { setSubmitting }) => {
		try {
			await axios.post(`${API_URL}/api/requests`, values);
			setSubmitting(false);
			navigate('/profile');
		} catch (error) {
			console.log('Error while submitting create a trip form');
		}
	};

	return (
		<>
			{cities && (
				<Grid container>
					<Grid item xs={12}>
						<h1>Request a Trip Itinerary</h1>
					</Grid>
					<hr />
					<Grid item xs={12}>
						<Container maxWidth="md">
							<div className={''}>
								<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
									{({ values, errors, touched, isSubmitting, isValidating, setFieldValue }) => (
										<Form>
											<Grid container spacing={4}>
												<Grid item xs={12}>
													<MultiSelect name="destination" label="City" options={cities} />
												</Grid>

												<Grid item xs={4}>
													<DatePicker name="startDate" label="Start Date" />
												</Grid>

												<Grid item xs={4}>
													<DatePicker name="endDate" label="End Date" />
												</Grid>

												<Grid item xs={4}>
													<TextField name="duration" label="Duration" type="number" />
												</Grid>

												<Grid item xs={6}>
													<TextField name="pax" label="# travelers" type="number" />
												</Grid>

												<Grid item xs={6}>
													<TextField name="budgetPerPerson" label="Budget per Person / day in $" type="number" />
												</Grid>

												<Grid item xs={12}>
													<MultiSelectArray name="typeOfAccommodation" label="Preferred type of accommodation" options={accommodationTypes} />
												</Grid>

												<Grid item xs={12}>
													<TextField name="detailsOccasion" label="Is this a special occasion? Tell more !" multiline={true} rows={4} />
												</Grid>

												<Grid item xs={12}>
													<MultiSelectArray name="activitiesInclude" label="Types os Activities you like to include" options={activitiesTypes} />
												</Grid>

												<Grid item xs={12}>
													<TextField name="specialRequest" label="Any other request?" multiline={true} rows={4} />
												</Grid>

												<Grid container display="flex" justifyContent="center">
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

export default RequestTripForm;
