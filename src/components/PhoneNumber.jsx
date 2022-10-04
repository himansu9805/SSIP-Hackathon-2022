import {
  TextField,
  FormControl,
  Typography,
  Button,
  InputAdornment,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function PhoneNumber(props) {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height="100%"
      {...props}
    >
      <FormControl>
        <Typography variant="h4">
          Enter your mobile
          <br />
          number to continue
        </Typography>
        <br />
        <TextField
          id="outlined-basic"
          label="Mobile No."
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">+91 </InputAdornment>
            ),
          }}
          sx={{
            width: "100%",
            borderRadius: "0%",
          }}
        />
        <br />
        <Button variant="contained" onClick={props.continueHandler}>
          Continue
        </Button>
      </FormControl>
    </Box>
  );
}

export default PhoneNumber;
