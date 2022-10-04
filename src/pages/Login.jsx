import {
  TextField,
  FormControl,
  Typography,
  Button,
  Grid,
  createTheme,
  InputAdornment,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import OTP from "../components/OTP";
import PhoneNumber from "../components/PhoneNumber";

const textInputTheme = createTheme({
  components: {
    MuiInput: {
      styleOverrides: {
        underline: {
          "&&:hover::before": {
            borderColor: "red",
          },
        },
      },
    },
  },
});

function Login() {
  return (
    <div className="loginContainer">
      <Grid container margin={0}>
        <Grid xs={12} md={7} height="100%">
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            height="100%"
          >
            <Box margin={10}>
              <Typography variant="h2">JAN SEVA KENDRA</Typography>
              <br />
              <Typography variant="h4">
                District Collectorate is the outcome of the strategic union of
                technology and positive governance.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid xs={12} md={5} width="100%" height="100%">
          <OTP />
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
