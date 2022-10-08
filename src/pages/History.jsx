import { useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../services/UserContext";
import { Button } from "@mui/material";

function History() {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // if (context.data === undefined) {
    //   navigate("/");
    // }
  }, []);
  function createData(name, calories) {
    return { name, calories };
  }

  const rows = [
    createData("Aadhar Card Updation", "06/10/2022"),
    createData("Birth Certificate Issuance", "06/05/2022"),
    createData("Ration Card Updation", "06/01/2022"),
    createData("Voter ID Card Issuance", "06/09/2021"),
    createData("Driver License Updation", "06/03/2021"),
  ];
  return (
    <Box>
      <Header />
      <Box
        p={5}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            marginTop: "10px",
            width: "80%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          className="genericContainer confirmContainer"
        >
          <Typography sx={{ marginLeft: "15px", padding: 0 }}>
            <h4>Appointment History</h4>
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "0px",
            }}
          >
            <TableContainer sx={{ maxWidth: 650 }} component={Paper}>
              <Table sx={{ maxWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Service</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Date
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right" style={{ color: "green" }}>
                        Done
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
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
      </Box>
    </Box>
  );
}

export default History;
