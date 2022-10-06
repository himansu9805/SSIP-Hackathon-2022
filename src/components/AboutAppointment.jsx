import { Box, Typography } from '@mui/material'
import React from 'react'

function AboutAppointment({service, slot}) {
  return (
    <div style={{marginLeft: '15px'}}>
      <Box>
        <b>Service</b> : &nbsp;{service}
        <Typography sx={{marginTop: "10px"}} fontStyle="italic">Description about this service like the required attached documents.</Typography>
      </Box>
    </div>
  )
}

export default AboutAppointment