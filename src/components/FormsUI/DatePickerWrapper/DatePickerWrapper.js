import React from 'react';
import { TextField } from '@material-ui/core';
import { useField } from 'formik';

const DatePickerWrapper = ({
  name,
  ...otherProps
}) => {
  const [field, meta] = useField(name);

  const configDatePickerWrapper = {
    ...field,
    ...otherProps,
    type: 'date',
    variant: 'outlined',
    fullWidth: true,
    InputLabelProps: {
      shrink: true
    }
  };

  if(meta && meta.touched && meta.error) {
    configDatePickerWrapper.error = true;
    configDatePickerWrapper.helperText = meta.error;
  }

  return (
    <TextField
      {...configDatePickerWrapper}
    />
  );
};

export default DatePickerWrapper;