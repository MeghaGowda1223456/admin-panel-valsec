import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, IconButton, Grid } from '@mui/material';

function SelectComponent({
  label = 'Select',
  value = '',
  star = 'block',
  name,
  onSearch,
  filterOption,
  handleChange,
  notFoundContent,
  errors,
  touched,
  faIcon,
  iconFun,
  mode,
  placeholder,
  labelfontweight = 600,
  errorfontweight = 400,
  allowClear,
  className = 'slect-smyroom',
  suffixIcon,
  options = [
    {
      value: '',
      label: 'SELECT',
    },
  ],
  style,
  defaultValue = 'SELECT',
}) {
  return (
    <div>
      <div className="re-inp-box">
        <Grid container justifyContent="space-between">
          <Grid item style={{ fontWeight: labelfontweight }}>
            <p style={{ display: star }} className="re-input-p">
              *
            </p>
            {label}
            {/* {faIcon && (
              <IconButton color="primary" onClick={iconFun} aria-label="icon" size="small">
                < icon={faIcon} />
              </IconButton>
            )} */}
          </Grid>
        </Grid>
        <FormControl fullWidth>
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <Select
            value={value}
            onChange={handleChange}
            // inputProps={{
            //   name: name,
            //   id: name,
            // }}
            displayEmpty
            placeholder={placeholder}
            autoWidth
            multiple={mode === 'multiple'}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {errors && errors[name] && touched[name] && (
            <p className="re-err fs-10" style={{ fontWeight: errorfontweight }}>
              {errors[name]}
            </p>
          )}
        </FormControl>
      </div>
    </div>
  );
}

export default SelectComponent;
