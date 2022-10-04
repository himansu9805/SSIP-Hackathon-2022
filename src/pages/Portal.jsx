import { MenuItem, Select, InputLabel, FormControl } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Header from '../components/Header'

function Portal() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <Box>
      <Header />
      <Box p={2}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
          <InputLabel id="demo-simple-select-standard-label">Select the service</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={age}
            onChange={handleChange}
            label="Click here to select service"
            native
          >
            <optgroup label="Category 1">
              <option value={1}>Option 1</option>
              <option value={2}>Option 2</option>
            </optgroup>
            <optgroup label="Category 1">
              <option value={1}>Option 1</option>
              <option value={2}>Option 2</option>
            </optgroup>
          </Select>
        </FormControl>
      </Box>
    </Box>
  )
}

export default Portal