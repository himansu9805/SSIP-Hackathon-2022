import { Typography } from '@mui/material'
import React from 'react'

function Header() {
  return (
    <div className='headerContainer'>
      <div className='headerLogo'></div>
      <div className='headerTitle'>
        <Typography variant='h4'>
          Jan Seva Kendra
        </Typography>
      </div>
    </div>
  )
}

export default Header