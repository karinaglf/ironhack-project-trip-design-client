import React from 'react';
import { Input, Button } from '@material-ui/core';
import { useField } from 'formik';

const InputWrapper = ({
  name,
  ...otherProps
}) => {
  const [field, meta] = useField(name);

  const configInputWrapper = {
    ...field,
    ...otherProps,
    fullWidth: true,
    id: "button-file",
  };

  if (meta && meta.touched && meta.error) {
    configInputWrapper.error = true;
    configInputWrapper.helperText = meta.error;
  }

  return (
    <>
    <Input {...configInputWrapper} />
    <label htmlFor="button-file">
    <Button variant="outlined" component="span" className={""}>Upload Cover Image</Button>
    </label> 
    </>
  );
};

export default InputWrapper;