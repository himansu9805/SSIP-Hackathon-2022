import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getDocs, getDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

function AdminAllUsers() {
  const [users, setUsers] = useState([]);

  React.useEffect(() => {
    async function getUsers() {
      const docsSnap = await getDocs(collection(db, "Users"));
      docsSnap.forEach(async (doc) => {
        console.log(doc.data());
        setUsers((oldArray) => [...oldArray, doc.data()]);
      });
    }
    getUsers();
  }, []);

  return (
    <div>
      <TableContainer sx={{ width: 950 }} component={Paper}>
        <Table sx={{ width: 950 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Aadhar No</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.aadhar_no}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AdminAllUsers;
