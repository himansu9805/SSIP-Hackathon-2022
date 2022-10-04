import { Typography } from '@mui/material';
import React from 'react'
import '../App.css';

function Slots() {
  return (
    <div className='slotsContainer'>
      <div style={{display: 'flex', width: '100%', flexDirection:'column'}}>
        <Typography>
          Slots
        </Typography>
        <div className='slotsGrid'>
          {
            [10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((slot, i)=>(
                <Slot text={"Slot"+i} />
              )
            )
          }
          <Slot text="Slot" type={1} />
          <Slot text="Slot" type={2} />
        </div>
      </div>
    </div>
  )
}

function Slot(props){
  const type = () => {
    if(props.type === 1){
      return "slot-red";
    } else if(props.type === 2) {
      return "slot-green";
    } else {
      return "";
    }
  }
  return (
    <div className={"slot "+type()}>
      {props.text} 
    </div>
  )
}

export default Slots