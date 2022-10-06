import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";

export function Loader() {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height="100%"
    >
      <div className="slideTransition">
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          height="100%"
        >
          <CircularProgress size="2.5rem" />
          <br />
          <Typography variant="h5">LOADING</Typography>
        </Box>
      </div>
    </Box>
  );
}
