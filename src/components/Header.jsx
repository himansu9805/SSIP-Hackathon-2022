import { Typography } from '@mui/material'
import React from 'react'

function Header() {
  return (
    <div className='headerContainer'>
      <div className='headerLogo'></div>
      <div className='headerTitle'>
        <Typography variant='h4'>
          This is Title
        </Typography>
      </div>
    </div>
  )
}

export default Header