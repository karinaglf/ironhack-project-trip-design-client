import React, { useState, useContext, useEffect } from 'react';
import { TextField, MenuItem } from '@material-ui/core';
import { useField, useFormikContext } from 'formik';
import axios from 'axios';

const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005';

const SelectWrapper = ({name, options,...otherProps}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const [cities, setCities] = useState([]);

  const getAllCities = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/cities`);
      setCities(response.data);
    } catch(error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getAllCities();
  }, [] );
  
  console.log(cities)


  const handleChange = evt => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  const configSelect = {
    ...field,
    ...otherProps,
    select: true,
    variant: 'outlined',
    fullWidth: true,
    onChange: handleChange
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <TextField {...configSelect}>
      {cities.map((item, pos) => {
        return (
          <MenuItem key={pos} value={item._id}>
            {options[item.name]}
          </MenuItem>
        )
      })}
    </TextField>
  );
};

export default SelectWrapper;