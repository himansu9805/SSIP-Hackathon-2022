import { Button, Select, FormControl, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import DatePick from '../components/DatePick';
import Header from '../components/Header'
import Slots from '../components/Slots';
import moment from 'moment'
import AboutAppointment from '../components/AboutAppointment';
function Portal() {
  const [service, setService] = React.useState('');
  const [date, setDate] = React.useState(moment(new Date()));
  const validSlots = [
    {time:'09 : 00 AM', isAvailable: true},
    {time:'10 : 00 AM', isAvailable: true},
    {time:'11 : 00 AM', isAvailable: true},
    {time:'12 : 00 PM', isAvailable: true},
    {time:'01 : 00 PM', isAvailable: true},
    {time:'02 : 00 PM', isAvailable: false},
    {time:'03 : 00 PM', isAvailable: false},
    {time:'04 : 00 PM', isAvailable: true},
    {time:'05 : 00 PM', isAvailable: true},
    {time:'06 : 00 PM', isAvailable: true}
  ] 
  const [slot, setSlot] = React.useState(0);
  const handleChange = (event) => {
    setService(event.target.value);
  };
  const bookAppointment = () => {
    const dateObj = moment(date)
    const data = {
      user: "",
      service : service,
      date: ""+dateObj.date()+"/"+(dateObj.month()+1)+"/"+dateObj.year(),
      slot: "slotId"
    }
    console.log(data)
  }
  return (
    <Box>
      <Header />
      <Box p={2}>
        <Grid container columnSpacing={ {md : 4}}>
          <Grid item xs={12} md={3} sx={{ display: "flex",flexDirection: "column", alignItems:"center", justifyContent:"center", padding: 0 }}>
            <div>
              <FormControl variant="standard" sx={{ minWidth: 250 }}>
                <Typography styles={{ paddingLeft: "10px", paddingTop: "10px" }}><h4>Select the service</h4></Typography>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={service}
                  onChange={handleChange}
                  native
                  variant="outlined">
                  <option aria-label="None" value="" />
                  <optgroup label="Card Issuance">
                    <option value={1}>Aadhar Card</option>
                    <option value={2}>Ration Card</option>
                  </optgroup>
                  <optgroup label="Certificates">
                    <option value={3}>Category Certificate</option>
                    <option value={4}>Option 2</option>
                  </optgroup>
                  <optgroup label="Updation">
                    <option value={5}>Option 1</option>
                    <option value={6}>Option 2</option>
                  </optgroup>
                </Select>
              </FormControl>
              <div className='datePickContainer'>
                <Typography><h4>Pick a date</h4></Typography>
                <DatePick announceDate={(date)=>setDate(date)} />
              </div>
              <div >
                &nbsp;
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Slots validSlots={validSlots} announceSlot={(i)=>{
              setSlot(i)
            }} />
            <div style={{marginTop:"30px"}} className='genericContainer'>
              <Typography sx={{ marginLeft: "15px", padding: 0 }}>
                <h4>About this service</h4>
              </Typography>
              <AboutAppointment service={service} slot={validSlots[slot]} />
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <div style={{marginTop:"30px"}} className='genericContainer confirmContainer'>
              <Typography sx={{ marginLeft: "15px", padding: 0 }}>
                <h4>Appointment Confirmation</h4>
              </Typography>
              <div className='confirmBody'>
                <div className='confirmDate'>
                  <Typography variant='h2' sx={{ fontWeight: 'bold', color: "#fff" }}>
                    { date.date() }
                  </Typography>
                </div>
                <div className='confirmFullDate'>
                  { date.format('dddd') }, { date.format('MMMM') } { date.date() }
                </div>
                <div className='confirmDateDetail'>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="18"><path d="M0 0h24v24H0z" fill="none" /><path fill="#333" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" /><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" /></svg>
                  </span>
                  <span style={{ marginLeft: "05px"}}>
                    { validSlots[slot].time } { validSlots[slot+1]?.time ? <> -  {validSlots[slot+1]?.time}</> : <></> }
                  </span>
                </div>
                <div className='confirmDateDetail'>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="18"><g><path d="M0,0h24v24H0V0z" fill="none" /></g><g><path  fill="#333" d="M12,2c-4.2,0-8,3.22-8,8.2c0,3.32,2.67,7.25,8,11.8c5.33-4.55,8-8.48,8-11.8C20,5.22,16.2,2,12,2z M12,12c-1.1,0-2-0.9-2-2 c0-1.1,0.9-2,2-2c1.1,0,2,0.9,2,2C14,11.1,13.1,12,12,12z" /></g></svg>
                  </span>
                  <span style={{ marginLeft: "05px"}}>
                    Fafda Road, Jalebi Gali, Dusshera
                  </span>
                </div>
                <br/>
                <Button variant="contained" onClick={bookAppointment}>Book Appointment</Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Portal