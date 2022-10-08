import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  TextField,
  InputAdornment,
  FormControl,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const auth = getAuth();

  const handleSubmit = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    setLoading(false);
    navigate("/admin/view");
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
          <div className="loginBox">
            <div className="slideTransition">
              <FormControl>
                <h4 className="loginSubText">
                  Welcome Admin,
                  <br />
                  login to continue
                </h4>
                <br />
                <TextField
                  id="outlined-basic"
                  label="Email"
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
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <TextField
                  id="outlined-basic"
                  label="Password"
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
                            <path d="M0,0h24v24H0V0z" fill="none" />
                          </g>
                          <g>
                            <g>
                              <path d="M2,17h20v2H2V17z M3.15,12.95L4,11.47l0.85,1.48l1.3-0.75L5.3,10.72H7v-1.5H5.3l0.85-1.47L4.85,7L4,8.47L3.15,7l-1.3,0.75 L2.7,9.22H1v1.5h1.7L1.85,12.2L3.15,12.95z M9.85,12.2l1.3,0.75L12,11.47l0.85,1.48l1.3-0.75l-0.85-1.48H15v-1.5h-1.7l0.85-1.47 L12.85,7L12,8.47L11.15,7l-1.3,0.75l0.85,1.47H9v1.5h1.7L9.85,12.2z M23,9.22h-1.7l0.85-1.47L20.85,7L20,8.47L19.15,7l-1.3,0.75 l0.85,1.47H17v1.5h1.7l-0.85,1.48l1.3,0.75L20,11.47l0.85,1.48l1.3-0.75l-0.85-1.48H23V9.22z" />
                            </g>
                          </g>
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
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Button onClick={handleSubmit} variant="contained">
                    Continue
                  </Button>
                )}
              </FormControl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
