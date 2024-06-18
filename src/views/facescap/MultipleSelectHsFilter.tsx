import React, { useState } from 'react';
import { Select, MenuItem, InputLabel, FormControl, Checkbox, ListItemText } from '@mui/material';

const MultipleSelectHsFilter = ({ options, label, selectedValues, setSelectedValues }) => {
  const handleChange = (event:any) => {
    setSelectedValues(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <Select
        multiple
        value={selectedValues}
        onChange={handleChange}
        displayEmpty
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em>Select HairStyle</em>;
          }
          return selected.join(', ');
        }}
      >
        <MenuItem disabled value="">
          <em>Select Pose</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <Checkbox checked={selectedValues.indexOf(option) > -1} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultipleSelectHsFilter;
