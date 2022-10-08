import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getDocs, getDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import { CircularProgress, LinearProgress } from "@mui/material";

function AdminHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getHistory() {
      const docsSnap = await getDocs(collection(db, "Appointments"));
      const arr = [];
      docsSnap.forEach(async (doc) => {
        console.log(doc.data());
        const service = await getDoc(doc.data().service_id);
        if (service.data() !== undefined) {
          setHistory((oldArray) => [
            ...oldArray,
            {
              date: doc.data().date,
              service_name: service.data().name,
            },
          ]);
        }
      });
      console.log("historyArr", arr);
    }
    setLoading(true);
    getHistory();
    setLoading(false);
  }, []);

  return (
    <div>
      {!loading ? (
        <TableContainer sx={{ width: 950 }} component={Paper}>
          <Table sx={{ width: 950 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Service</TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right">
                  Date Time
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right">
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((row) => (
                <TableRow
                  key={row.service_name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.service_name}
                  </TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                  <TableCell align="right" style={{ color: "green" }}>
                    Done
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div
          style={{
            width: "1000px",
            paddingTop: "100px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={"3rem"} />
          <span style={{ padding: "25px", fontSize: "2rem" }}>LOADING</span>
        </div>
      )}
    </div>
  );
}

export default AdminHistory;
