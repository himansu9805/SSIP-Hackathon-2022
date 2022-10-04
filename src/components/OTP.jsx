import { FormControl, Typography, Button, Link } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState, useCallback } from "react";
import React from "react";

function OTP() {
  const timerValue = 72;

  const [timer, setTimer] = useState(timerValue);
  const timeOutCallback = useCallback(
    () => setTimer((currTimer) => currTimer - 1),
    []
  );

  useEffect(() => {
    timer > 0 && setTimeout(timeOutCallback, 1000);
  }, [timer, timeOutCallback]);

  console.log(timer);

  const resetTimer = function () {
    if (!timer) {
      setTimer(timerValue);
    }
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
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height="100%"
    >
      <FormControl>
        <Typography variant="h4">
          Enter the OTP sent on
          <br />
          your mobile number
        </Typography>
        <br />
        <Box>
          <input
            name="field-1"
            maxLength={1}
            onKeyUp={(e) => inputFocus(e)}
            className="otpContainer"
            type="text"
          ></input>
          <input
            name="field-2"
            maxLength={1}
            onKeyUp={(e) => inputFocus(e)}
            className="otpContainer"
            type="text"
          ></input>
          <input
            name="field-3"
            maxLength={1}
            onKeyUp={(e) => inputFocus(e)}
            className="otpContainer"
            type="text"
          ></input>
          <input
            name="field-4"
            maxLength={1}
            onKeyUp={(e) => inputFocus(e)}
            className="otpContainer"
            type="text"
          ></input>
          <input
            name="field-5"
            maxLength={1}
            onKeyUp={(e) => inputFocus(e)}
            className="otpContainer"
            type="text"
          ></input>
          <input
            name="field-6"
            maxLength={1}
            onKeyUp={(e) => inputFocus(e)}
            className="otpContainer"
            type="text"
          ></input>
        </Box>
        <br />
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
            <Link href="#" onClick={resetTimer}>
              Click here to resend OTP
            </Link>
          )}
        </Typography>
        <br />
        <Button variant="contained">Continue</Button>
      </FormControl>
    </Box>
  );
}

export default OTP;
