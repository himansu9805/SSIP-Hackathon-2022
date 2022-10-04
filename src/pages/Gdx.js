import { Grid } from '@mui/material'
import React from 'react'

function Gdx() {
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item sx={{border: "1px solid red"}} xs={12} md={4}>
        <div style={{padding: "20px"}}>1</div>
        <div style={{padding: "20px"}}>2</div>
      </Grid>
      <Grid item sx={{ border: "1px solid red" }} xs={12} md={4}>
        <div style={{padding: "20px"}}>1</div>
        <div style={{padding: "20px"}}>2</div>
      </Grid>
      <Grid item sx={{border: "1px solid red"}} xs={12} md={4}>
        <div style={{padding: "20px"}}>1</div>
        <div style={{padding: "20px"}}>2</div>
      </Grid>
    </Grid>
  )
}

export default Gdx