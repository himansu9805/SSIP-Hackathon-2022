import { useContext, useEffect } from 'react'
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Header from "../components/Header";
import "../styles/BookingConfirmation.css";
import { styled } from "@mui/material/styles";
import React from "react";
import { Typography, Button } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../services/UserContext";
export function BookingConfirmation() {
  const [searchParams, setSearchParams] = useSearchParams();
  const context = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (context.data === undefined) {
      navigate('/');
    }
  }, [])
  return (
    <div className="confirmationParent">
      <Header />
      <div className="confirmationContainer">
        <div
          style={{ marginTop: "30px", padding: "25px", width: "20%" }}
          className="genericContainer confirmContainer"
        >
          <h1 className="confirmationText1">Your Booking ID is</h1>
          <h1 className="confirmationID">{searchParams.get("id")}</h1>
          <span className="confirmationNote">NOTE:</span>
          <br />
          <span className="confirmationNote">
            1) Kindly carry your <strong>Aadhar Card</strong> with you when you
            visit Jan Seva Kendra.
          </span>
          <br />
          <span className="confirmationNote">
            2) Please visit the Jan Seva Kendra only during your alloted slot.
          </span>
        </div>
      </div>
      <div className="confirmationContainer">
        <div
          style={{ marginTop: "30px", padding: "25px", width: "20%" }}
          className="genericContainer confirmContainer"
        >
          <div style={{ marginBottom: "10px" }} className="confirmationRow">
            <span>Don't know the address?</span>
          </div>
          <span>
            <HtmlTooltip
              title={
                <React.Fragment>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                      style={{ marginRight: "10px" }}
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" />
                    </svg>
                    <Typography color="inherit">Google Maps link</Typography>
                  </div>
                  <a href="https://www.google.com/maps/place/Mamlatdar+%26+Executive+Magistrate+Office,+Bharuch/@21.7092553,72.9886071,17z/data=!3m1!4b1!4m5!3m4!1s0x3be0274d2e7c3ecf:0xf08ae9ba639dfd53!8m2!3d21.7092554!4d72.9907957">
                    Click here to show the office location on the Google Maps
                  </a>{" "}
                </React.Fragment>
              }
            >
              <Button>
                Mamlatdar & Executive Magistrate Office, Railway Colony,
                Bharuch, Gujarat 392001
              </Button>
            </HtmlTooltip>
          </span>
        </div>
        <div style={{ marginTop: "30px" }}>
          <Link to="/portal" style={{ textDecoration: "none" }}>
            <Button variant="contained">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                fill="white"
                style={{ marginRight: "10px" }}
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              </svg>
              Go back
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));
