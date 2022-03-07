import axios from 'axios';
import { useState, useEffect } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Grid, Typography, Input, Button } from '@material-ui/core';
import TextField from '../FormsUI/TextFieldWrapper';
import SubmitButton from '../FormsUI/SubmitButtonWrapper';
import Select from '../FormsUI/SelectWrapper';
import fileService from '../../services/file.service';

const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005';

function EditItem({ type, id, setOpen, isUpdated, setIsUpdated }) {
	const [item, setItem] = useState(null);
	const [isUploaded, setIsUploaded] = useState(false);
	const [errorMessage, setErrorMessage] = useState(undefined);
	const [cities, setCities] = useState();

	const getItem = async () => {
		try {
			const response = await axios.get(`${API_URL}/api/${type}/${id}`);
			const oneItem = response.data;
			setItem(oneItem);
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

	useEffect(() => {
    getItem();
		getAllCities();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//Form Initial Values
	const initialValues = {
		name: item?.name,
		description: item?.description,
		category: item?.category,
		externalUrl: item?.externalUrl,
		affiliateLink: item?.affiliateLink,
		img: item?.image,
		city: item?.city,
	};

	//Form Validation Schema
	const validationSchema = Yup.object({
		name: Yup.string().required('Insert a name'),
	});

	//Handle Submit
	const handleSubmit = async (values, { setSubmitting }) => {
		try {
			await axios.put(`${API_URL}/api/${type}/${id}`, values);

			setIsUpdated(!isUpdated);
			setSubmitting(false);
			setOpen(false);
		} catch (error) {
			console.log('Error while submitting the form');
		}
	};

	// Handle File Upload
	const handleFileUpload = async (e, setFieldValue) => {
		try {
			const uploadData = new FormData();

			uploadData.append('imageUrl', e.target.files[0]); // <-- set the file in the form

			const response = await fileService.uploadImage(uploadData);

			setFieldValue('img', response.data.secure_url);
			setIsUploaded(!isUploaded);
		} catch (error) {
			setErrorMessage(error);
		}
	};

	return (
		<>
			{cities && (
				<>
					<h2>Edit {type} </h2>
					<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
						{({ values, errors, isSubmitting, isValidating, setFieldValue }) => (
							<Form>
								<Typography m={5}>{errorMessage}</Typography>
								<Grid container spacing={4} justifyContent="center">
									<Grid item xs={12}>
										<TextField name="name" label="Name" />
									</Grid>
									<Grid item xs={12}>
										<TextField name="description" label="Description" />
									</Grid>
									<Grid item xs={6}>
										<Select name="city" label="City" options={cities} />
									</Grid>
									<Grid item xs={6}>
										<TextField name="category" label="Category" />
									</Grid>
									<Grid item xs={12}>
										<TextField name="externalUrl" label="Website" />
									</Grid>
									<Grid item xs={12}>
										<TextField name="affiliateLink" label="Affiliate Link" />
									</Grid>
									<Input type="file" name="img" onChange={(e) => handleFileUpload(e, setFieldValue)} style={{ display: 'none' }} id="button-file" />
									<label htmlFor="button-file">
										<Button variant="outlined" component="span">
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

export default EditItem;
