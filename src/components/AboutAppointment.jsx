import { Box, Typography } from '@mui/material'
import React from 'react'

function AboutAppointment({service}) {
  return (
    <div style={{ marginTop: "30px" }} className='genericContainer'>
      <Typography sx={{ marginLeft: "15px", padding: 0 }}>
        <h4>About this service</h4>
      </Typography>
      <div style={{marginLeft: '15px'}}>
        <Box ml={2}>
          <p><span style={{fontWeight:"bold"}}>Service</span> : &nbsp;{service.name}</p>
          <p><span style={{fontWeight:"bold"}}>Required documents</span> : &nbsp;{service.requirements}</p>
          <Typography sx={{marginTop: "10px"}} fontStyle="italic">{service.description}</Typography>
        </Box>
      </div>
    </div>
  )
}

export default AboutAppointment