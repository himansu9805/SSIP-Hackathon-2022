import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export function Loader() {
  return (
    <div className="loginBox">
      <div className="slideTransition">
        <div className="loginBoxLodaer">
          <CircularProgress size="2.5rem" />
          <br />
          <h5 className="loginSubText">LOADING</h5>
        </div>
      </div>
    </div>
  );
}
