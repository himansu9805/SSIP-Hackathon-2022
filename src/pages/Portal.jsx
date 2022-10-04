import { MenuItem, Select, InputLabel, FormControl, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import DatePick from '../components/DatePick';
import Header from '../components/Header'
import Slots from '../components/Slots';

function Portal() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <Box>
      <Header />
      <Box p={2}>
        <Grid sx={{height: "80vh"}} container columnSpacing={ {md : 4}}>
          <Grid item xs={12} md={3} sx={{ display: "flex",flexDirection: "column", alignItems:"center", justifyContent:"center", padding: 0 }}>
            <div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                <Typography styles={{ paddingLeft: "10px", paddingTop: "10px" }}><h4>Select the service</h4></Typography>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={age}
                onChange={handleChange}
                native
                variant="outlined" 
                
              >
                <option aria-label="None" value="" />
                <optgroup label="Card Issuance">
                  <option value={1}>Aadhar Card</option>
                  <option value={2}>Ration Card</option>
                </optgroup>
                <optgroup label="Certificates">
                  <option value={1}>Category Certificate</option>
                  <option value={2}>Option 2</option>
                </optgroup>
                <optgroup label="Updation">
                  <option value={1}>Option 1</option>
                  <option value={2}>Option 2</option>
                </optgroup>
              </Select>
            </FormControl>
            <div className='datePickContainer'>
              <Typography><h4>Pick a date</h4></Typography>
              <DatePick />
            </div>
            <div style={{height:"500px"}}>
              &nbsp;
            </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Slots />
          </Grid>
          <Grid item xs={12} md={3}>
            abc
          </Grid>
        </Grid>
        


      </Box>
    </Box>
  )
}

export default Portal