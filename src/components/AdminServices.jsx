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

function AdminServices() {
  const [services, setServices] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    async function getServices() {
      const docsSnap = await getDocs(collection(db, "Services"));
      docsSnap.forEach(async (doc) => {
        console.log(doc.data());
        setServices((oldArray) => [...oldArray, doc.data()]);
      });
    }
    setLoading(true);
    getServices();
    setLoading(false);
  }, []);

  return (
    <div>
      <TableContainer sx={{ width: 950 }} component={Paper}>
        <Table sx={{ width: 950 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Desk No</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.desk_no}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AdminServices;
