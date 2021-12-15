import React from 'react';
import { Button } from '@material-ui/core';
import { useFormikContext } from 'formik';

const ButtonWrapper = ({
  children,
  ...otherProps
}) => {
  const { submitForm } = useFormikContext();

  const handleSubmit = () => {
    submitForm();
  }

  const configButton = {
    variant: 'contained',
    color: 'primary',
    fullWidth: false,
    onClick: handleSubmit
  }

  return (
    <Button
      {...configButton}
      size="large"
    >
      {children}
    </Button>
  );
};

export default ButtonWrapper;