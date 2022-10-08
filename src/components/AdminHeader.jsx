import { Button, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import { UserContext } from "../services/UserContext";
import { Link } from "react-router-dom";
import "./header.css";
import { useNavigate } from "react-router-dom";

function AdminHeader() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const context = React.useContext(UserContext);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  return (
    <div className="headerContainer">
      <div className="logoImage"></div>
      <div className="title">
        <Typography variant="h5">Jan Seva Kendra</Typography>
      </div>
      <div className="userContainer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="40"
          viewBox="0 0 24 24"
          width="40"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
        </svg>

        <div>
          <Button
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            {context.data?.name}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {context.data && context.data.name === "admin" && (
              <MenuItem onClick={handleClose}>
                <Link
                  to="/history"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Appointment History
                </Link>
              </MenuItem>
            )}
            <MenuItem
              onClick={() => {
                handleClose();
                navigate("/admin");
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
