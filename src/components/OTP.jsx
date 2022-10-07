import { FormControl, Typography, Button, Link } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState, useCallback } from "react";
import React from "react";

function OTP(props) {
  const timerValue = 90;

  const [otp1, setOTP1] = useState();
  const [otp2, setOTP2] = useState();
  const [otp3, setOTP3] = useState();
  const [otp4, setOTP4] = useState();
  const [otp5, setOTP5] = useState();
  const [otp6, setOTP6] = useState();

  const [error, setError] = useState(false);

  const [timer, setTimer] = useState(timerValue);
  const timeOutCallback = useCallback(
    () => setTimer((currTimer) => currTimer - 1),
    []
  );

  useEffect(() => {
    timer > 0 && setTimeout(timeOutCallback, 1000);
  }, [timer, timeOutCallback]);

  const resendOTP = function () {
    if (!timer) {
      setTimer(timerValue);
    }
    props.resendOTP(props.phone);
  };

  const inputFocus = (e) => {
    const { maxLength, value, name } = e.target;
    const [fieldName, fieldIndex] = name.split("-");

    let fieldIntIndex = parseInt(fieldIndex, 10);

    if (e.key === "Delete" || e.key === "Backspace") {
      const nextfield = document.querySelector(
        `input[name=field-${fieldIntIndex - 1}]`
      );
      nextfield.focus();
    }

    if (value.length >= maxLength) {
      if (fieldIntIndex < 6) {
        const nextfield = document.querySelector(
          `input[name=field-${fieldIntIndex + 1}]`
        );
        if (nextfield !== null) {
          nextfield.focus();
        }
      }
    }
  };

  const handleSubmit = () => {
    const otp = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
    if (otp.length === 6) {
      setError(false);
      props.verifyOTP(otp);
    } else {
      console.log(otp.length);
      setError(true);
    }
  };

  return (
    <div className="loginBox">
      <div className="slideTransition">
        <FormControl>
          <div className="loginSubText">
            Enter the OTP sent on
            <br />
            your mobile number
          </div>
          <br />
          <div>
            <input
              name="field-1"
              maxLength={1}
              onKeyUp={(e) => inputFocus(e)}
              className={
                error || props.otpError ? "otpContainerError" : "otpContainer"
              }
              type="text"
              onChange={(e) => setOTP1(e.target.value)}
            ></input>
            <input
              name="field-2"
              maxLength={1}
              onKeyUp={(e) => inputFocus(e)}
              className={
                error || props.otpError ? "otpContainerError" : "otpContainer"
              }
              type="text"
              onChange={(e) => setOTP2(e.target.value)}
            ></input>
            <input
              name="field-3"
              maxLength={1}
              onKeyUp={(e) => inputFocus(e)}
              className={
                error || props.otpError ? "otpContainerError" : "otpContainer"
              }
              type="text"
              onChange={(e) => setOTP3(e.target.value)}
            ></input>
            <input
              name="field-4"
              maxLength={1}
              onKeyUp={(e) => inputFocus(e)}
              className={
                error || props.otpError ? "otpContainerError" : "otpContainer"
              }
              type="text"
              onChange={(e) => setOTP4(e.target.value)}
            ></input>
            <input
              name="field-5"
              maxLength={1}
              onKeyUp={(e) => inputFocus(e)}
              className={
                error || props.otpError ? "otpContainerError" : "otpContainer"
              }
              type="text"
              onChange={(e) => setOTP5(e.target.value)}
            ></input>
            <input
              name="field-6"
              maxLength={1}
              onKeyUp={(e) => inputFocus(e)}
              className={
                error || props.otpError ? "otpContainerError" : "otpContainer"
              }
              type="text"
              onChange={(e) => setOTP6(e.target.value)}
            ></input>
          </div>
          <br />
          {error ||
            (props.otpError && (
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
                    Please enter a valid OTP.
                  </Typography>
                </Box>
                <br />
              </>
            ))}
          <Typography variant="body1">
            Didn't get the OTP?
            <br />
            {timer >= 60 ? "Wait for 01:" : timer > 0 && "Wait for 00:"}
            {timer > 60 ? (
              timer - 60 >= 10 ? (
                (timer - 60).toString()
              ) : (
                "0" + (timer - 60).toString()
              )
            ) : timer === 60 ? (
              "00"
            ) : timer >= 10 ? (
              timer
            ) : timer > 0 ? (
              "0" + timer.toString()
            ) : (
              <Link href="#" onClick={resendOTP}>
                Click here to resend OTP
              </Link>
            )}
          </Typography>
          <br />
          <Button variant="contained" onClick={handleSubmit}>
            Continue
          </Button>
        </FormControl>
      </div>
    </div>
  );
}

export default OTP;
