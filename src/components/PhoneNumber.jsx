import {
  TextField,
  FormControl,
  Typography,
  Button,
  InputAdornment,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

function PhoneNumber(props) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = () => {
    if (phone.length === 10) {
      setError(false);
      props.handleSubmit(phone);
    } else {
      setError(true);
    }
  };

  return (
    <div className="loginBox">
      <div className="slideTransition">
        <FormControl>
          <h4 className="loginSubText">
            Enter your mobile
            <br />
            number to continue
          </h4>
          <br />
          <TextField
            error={error}
            id="outlined-basic"
            label="Mobile No."
            variant="outlined"
            helperText={error && "Please enter a valid mobile number."}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+91 </InputAdornment>
              ),
            }}
            inputProps={{
              maxLength: 10,
            }}
            sx={{
              width: "100%",
              borderRadius: "0%",
            }}
            onChange={(e) => handlePhoneChange(e)}
            value={phone}
          />
          <br />
          {props.otpError && (
            <>
              <Box display="flex" justifyContent="center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  fill="#ed4040e3"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                <Typography
                  marginLeft="5px"
                  textAlign="center"
                  variant="body1"
                  color="#ed4040e3"
                >
                  Something went wrong.
                </Typography>
              </Box>
              <br />
            </>
          )}
          <Button variant="contained" onClick={handleSubmit}>
            Continue
          </Button>
        </FormControl>
      </div>
    </div>
  );
}

export default PhoneNumber;
