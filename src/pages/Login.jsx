import React, { useState } from "react";
import PhoneNumber from "../components/PhoneNumber";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import OTP from "../components/OTP";
import NewUser from "../components/NewUser";
import { createNewUser, isNewUser } from "../services/NewUser";
import { Loader } from "../components/Loader";
import { Navigate } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import { UserContext } from '../services/UserContext';
import { getDoc, doc } from '@firebase/firestore'
import { db } from "../firebase";

function Login() {
  const context = React.useContext(UserContext);
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
        console.log(user)
        setIsNew(await isNewUser(user.uid));
        
        
        async function getDataForContext() {
          try {
            console.log("[getDataForContext] in uid", user.uid)
            const docSnap = await getDoc(doc(db, "Users", user.uid));
            context.data = {
              user_id: docSnap.id,
              aadhar_no: docSnap.data().aadhar_no,
              name: docSnap.data().name,
            };
            console.log(context.data)
          } catch (err) {
            console.log("[getDataForContext] error ", err);
          }
        }

        getDataForContext();
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
      <div className="loginGridRoot">
        <div className="loginGridChild">
          <div className="loginBox">
            <div className="loginBoxImage">
              <div className="loginHeaderImage"></div>
            </div>
            <div className="loginBox">
              <div className="loginBoxText">
                <h2 className="janSevaKendraText">JAN SEVA KENDRA</h2>
                <br />
                <h4 className="loginSubText">
                  District Collectorate is the outcome of the strategic union of
                  technology and positive governance.
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="loginGridChild">
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
            <div className="loginBox">
              <h1>Redirecting to Portal</h1>
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
              {<Navigate to="/portal" />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
