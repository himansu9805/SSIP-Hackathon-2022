import { Typography, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import PhoneNumber from "../components/PhoneNumber";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import OTP from "../components/OTP";
import NewUser from "../components/NewUser";
import { createNewUser, isNewUser } from "../services/NewUser";
import { Loader } from "../components/Loader";
import { Navigate } from 'react-router-dom';
function Login() {
  const [otpSent, setotpSent] = useState(false);
  const [otpError, setotpError] = useState(false);
  const [user, setUser] = useState(undefined);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      auth
    );
  };

  const handleSubmit = (phone) => {
    setotpSent(true);
    setPhone(phone);
    console.log(phone);
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, "+91" + phone, appVerifier)
      .then((confirmationResult) => {
        setotpError(false);
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        setotpError(true);
      });
  };

  const verifyOTP = (otp) => {
    setLoading(true);
    console.log(otp);
    let confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(otp)
      .then(async (result) => {
        const user = result.user;
        console.log(user);
        setotpError(false);
        setUser(user);
        setIsNew(await isNewUser(user.uid));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setotpError(true);
        setLoading(false);
      });
  };

  const newUser = (uid, userData) => {
    createNewUser(uid, userData);
    setIsNew(false);
  };

  return (
    <div className="loginContainer">
      <div className="loginIndiaImage"></div>
      <Grid container margin={0}>
        <Grid xs={12} md={7} height="100%">
          <div className="loginHeaderImage"></div>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            height="100%"
          >
            <Box margin={10}>
              <h2 className="janSevaKendraText">JAN SEVA KENDRA</h2>
              <br />
              <Typography variant="h4">
                District Collectorate is the outcome of the strategic union of
                technology and positive governance.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid xs={12} md={5} width="100%" height="100%">
          <div className="loginAzadiImage"></div>
          {user === undefined ? (
            <>
              {otpSent ? (
                <OTP
                  phone={phone}
                  resendOTP={(phone) => handleSubmit(phone)}
                  verifyOTP={(otp) => verifyOTP(otp)}
                  otpError={otpError}
                />
              ) : (
                <PhoneNumber
                  handleSubmit={(phone) => handleSubmit(phone)}
                  otpError={otpError}
                />
              )}
              <div id="recaptcha-container"></div>
            </>
          ) : loading ? (
            <Loader />
          ) : user !== undefined && isNew ? (
            <NewUser
              uid={user.uid}
              createNewUser={(uid, userData) => newUser(uid, userData)}
            />
          ) : (
            <>
            <h1>Redirect to Portal</h1>
            <Navigate to="/portal" />
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
