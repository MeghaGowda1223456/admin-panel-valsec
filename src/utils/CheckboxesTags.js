import { Autocomplete, Checkbox, TextField } from '@mui/material';
import React from 'react';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags(data) {
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={data.options}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
          {option.title}
        </li>
      )}
      style={{ width: 200, marginTop: 15 }}
      renderInput={(params) => <TextField {...params} label={data.lable} placeholder={data.lable} />}
    />
  );
}
