import {
  TextField,
  FormControl,
  Typography,
  Button,
  InputAdornment,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { createNewUser } from "../services/NewUser";

function PhoneNumber(props) {
  const [name, setName] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (name.length !== 0 && aadhar.length === 12) {
      props.createNewUser(props.uid, {
        name: name,
        aadhar_no: aadhar,
        email: email,
      });
    } else {
      setError(true);
    }
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height="100%"
      {...props}
    >
      <div className="slideTransition">
        <FormControl>
          <Typography variant="h4">
            Welcome new user,
            <br />
            please fill the details
          </Typography>
          <br />
          <TextField
            required
            id="outlined-basic"
            label="Full Name"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                  </svg>
                </InputAdornment>
              ),
            }}
            inputProps={{
              maxLength: 64,
            }}
            sx={{
              width: "100%",
              borderRadius: "0%",
            }}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <br />
          <TextField
            required
            id="outlined-basic"
            label="Aadhar Number"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enable-background="new 0 0 24 24"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <g>
                      <rect fill="none" height="24" width="24" />
                    </g>
                    <g>
                      <path d="M20,7h-5V4c0-1.1-0.9-2-2-2h-2C9.9,2,9,2.9,9,4v3H4C2.9,7,2,7.9,2,9v11c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V9 C22,7.9,21.1,7,20,7z M9,12c0.83,0,1.5,0.67,1.5,1.5S9.83,15,9,15s-1.5-0.67-1.5-1.5S8.17,12,9,12z M12,18H6v-0.75c0-1,2-1.5,3-1.5 s3,0.5,3,1.5V18z M13,9h-2V4h2V9z M18,16.5h-4V15h4V16.5z M18,13.5h-4V12h4V13.5z" />
                    </g>
                  </svg>
                </InputAdornment>
              ),
            }}
            inputProps={{
              maxLength: 12,
            }}
            sx={{
              width: "100%",
              borderRadius: "0%",
            }}
            onChange={(e) => setAadhar(e.target.value)}
            value={aadhar}
          />
          <br />
          <TextField
            id="outlined-basic"
            label="Email ID (optional)"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </InputAdornment>
              ),
            }}
            inputProps={{
              maxLength: 32,
            }}
            sx={{
              width: "100%",
              borderRadius: "0%",
            }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <br />
          <Button variant="contained" onClick={handleSubmit}>
            Continue
          </Button>
        </FormControl>
      </div>
    </Box>
  );
}

export default PhoneNumber;
