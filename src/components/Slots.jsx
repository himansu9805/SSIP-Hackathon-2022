import { Typography } from "@mui/material";
import React from "react";
import "../App.css";
import "./slots.css";
import CircularProgress from '@mui/material/CircularProgress';

function Slots({ validSlots, announceSlot, availabilityArray, loading }) {
  const [selected, setSelected] = React.useState(false);
  // console.log("[Slots] slotsList length", validSlots.length)
  // console.log("[globalSelected] ", selected)
  return (
    <div className="slotsContainer">
      <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
        <Typography sx={{ marginLeft: "15px", padding: 0 }}>
          <h4>Pick a time for appointment</h4>
        </Typography>
        <div className="slotsGrid">
          {validSlots.map((slot, i) => {
            return (
              <Slot
                key={i}
                i={i}
                slot={slot}
                availability={availabilityArray[i]}
                announceSlot={announceSlot}
                selected={selected}
                selectHandler={(b) => {
                  setSelected(b);
                  // console.log("[selectHandler globalSelect] ",selected)
                }}
                loading = {loading}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Slots;

function Slot({ i, slot, announceSlot, selected, selectHandler, availability, loading }) {
  const avail = 10-availability;
  const [localSelected, setLocalSelected] = React.useState(selected);
  let typeClass = "";
  if (slot.isAvailable === false) {
    typeClass = "slot-red";
  } else {
    typeClass = "";
  }
  console.log(avail)
  // console.log("[localSelected]", localSelected);
  return (
    <div className="button">
      <input
        key={i}
        disabled={avail>0 ? false : true}
        className={avail>0 ? "inputEnabled" : "2"}
        type="radio"
        id="other"
        name="amount"
        onClick={() => announceSlot(i) }
      />
      <label
        for="other"
        id="time"
        className={
          avail>0 ? "inputEnabledLabel" : "inputDisabledLabel"
        }
        
      >
        {slot.time}
        <br />
        {loading || isNaN(avail) ? <CircularProgress size="1rem" sx={{color:"white"}} /> : <span style={{ fontSize: "0.8rem" }}>{avail}</span>}
      </label>
      {/* <div
        className={
          "slot " +
          typeClass +
          (slot.isAvailable && localSelected ? " slot-green" : "")
        }
        onClick={() => {
          if (slot.isAvailable) {
            if(selected){
          selectHandler(false)
          setLocalSelected(false)
        } else {
          selectHandler(true)
          setLocalSelected(true)
        }
            selectHandler(false);
            setLocalSelected(!selected);
            // setLocalSelected(!localSelected)
            // console.log("[localSelected] click", !localSelected)
            
          }
        }}
      ></div> */}
    </div>
  );
}
