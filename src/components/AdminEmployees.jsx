import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getDocs, getDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

function AdminEmployees() {
  const [employees, setEmployees] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    async function getEmployees() {
      const docsSnap = await getDocs(collection(db, "Employees"));
      docsSnap.forEach(async (doc) => {
        console.log(doc.data());
        setEmployees((oldArray) => [...oldArray, doc.data()]);
      });
    }
    setLoading(true);
    getEmployees();
    setLoading(false);
  }, []);

  return (
    <div>
      <TableContainer sx={{ width: 950 }} component={Paper}>
        <Table sx={{ width: 950 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>email_id</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>phone_no</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Aadhar_no</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees !== undefined &&
              employees.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone_no}</TableCell>
                  <TableCell>{row.aadhar_no}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AdminEmployees;
