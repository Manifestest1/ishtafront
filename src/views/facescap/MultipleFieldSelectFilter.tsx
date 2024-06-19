import React, { useState } from 'react';
import { Select, MenuItem, InputLabel, FormControl, Checkbox, ListItemText } from '@mui/material';

const MultipleFieldSelectFilter = ({ options = [] }) => {


  return (
    

    <FormControl fullWidth>
   <Select label="Status"  defaultValue="Select Category" >
                    <MenuItem value='Select Category'>Select Category</MenuItem>
                    {options && options.map(option => (
                        <MenuItem key={option.id} value={option.sub_category}>
                        {option.sub_category}
                        </MenuItem>
                    ))}
                </Select>
  </FormControl>
  );
};

export default MultipleFieldSelectFilter;
