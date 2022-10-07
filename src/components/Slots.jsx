import { Typography } from '@mui/material';
import React from 'react'
import '../App.css';

function Slots({ validSlots, announceSlot }) {
  const [selected, setSelected] = React.useState(false)
  // console.log("[globalSelected] ", selected)
  return (
    <div className='slotsContainer'>
      <div style={{display: 'flex', width: '100%', flexDirection:'column'}}>
        <Typography sx={{marginLeft: "15px", padding:0}}>
          <h4>Pick a time for appointment</h4>
        </Typography>
        <div className='slotsGrid'>
          {
            validSlots.map((slot, i)=>{
              return (
                <Slot key={i} i={i}
                  slot={slot}
                  announceSlot={announceSlot}
                  selected = {selected}
                  selectHandler = {(b)=>{
                    setSelected(b)
                    // console.log("[selectHandler globalSelect] ",selected)
                  }}
                />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
export default Slots;

function Slot({i, slot, announceSlot, selected, selectHandler}) {
  const [localSelected, setLocalSelected] = React.useState(selected)
  let typeClass=""
  if (slot.isAvailable === false) {
    typeClass = "slot-red";
  } else {
    typeClass = "";
  }
  // console.log("[localSelected]", localSelected)
  return (
    <div className={"slot " + typeClass + (slot.isAvailable&&localSelected ? " slot-green" : "")}
    onClick={() => {
      if(slot.isAvailable){
        /* if(selected){
          selectHandler(false)
          setLocalSelected(false)
        } else {
          selectHandler(true)
          setLocalSelected(true)
        } */
        // selectHandler(false)
        setLocalSelected(!selected)
        // setLocalSelected(!localSelected)
        // console.log("[localSelected] click", !localSelected)
        announceSlot(i)
      }
    }}>
      <Typography>{slot.time}</Typography>
    </div>
  )
}