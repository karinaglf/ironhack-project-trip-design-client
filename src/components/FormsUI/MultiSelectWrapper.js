import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useField, useFormikContext } from 'formik';
import { SliderValueLabel } from '@mui/material';

const ITEM_HEIGHT = 30;
const ITEM_PADDING_TOP = 5;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

function getStyles(item, selection, theme) {
  return {
    fontWeight:
      selection.indexOf(item) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const MultiSelectWrapper = ({
  name,
  options,
  label,
  ...otherProps
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const theme = useTheme();
  const [selection, setSelection] = React.useState([]);

  const handleChange = evt => {
    console.log(evt.target)
    const { value } = evt.target;
    setFieldValue(name, value);
    setSelection(value);
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
    <div>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          labelId="multiple-chip-label"
          id="multiple-chip"
          fullWidth
          multiple
          name={field}
          value={selection}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label={label} />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {Object.keys(options).map((item, pos) => {
        return (
          <MenuItem sx={{padding: '10px'}} key={pos} value={item}>
            {options[item]}
          </MenuItem>
          )
          })}
        </Select>
      </FormControl>
    </div>
  );
}
export default MultiSelectWrapper;
