import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getDocs, getDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { Box } from "@mui/system";
import { Alert, Button, IconButton, Snackbar } from "@mui/material";
import {useState} from 'react'
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grow from "@mui/material/Grow";
function AdminEmployees() {
  const [employees, setEmployees] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [openItemEDialog, setOpenItemEDialog] = useState([false, {}]);
  const [openItemDDialog, setOpenItemDDialog] = useState([false, {}]);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarText, setSnackbarText] = React.useState([]);
  const [servicesList, setServicesList] = React.useState([]); 
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const showSnackbar = (msg) => {
    setSnackbarText(msg);
    setOpenSnackbar(true);
  };
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  React.useEffect(() => {
    async function getEmployees() {
      const docsSnap = await getDocs(collection(db, "Employees"));
      docsSnap.forEach(async (doc) => {
        console.log(doc.data());
        setEmployees((oldArray) => [...oldArray, {id: doc.id, ...doc.data()}]);
      });
    }
    setLoading(true);
    getEmployees();
    setLoading(false);
  }, [db]);

  const handleOpenItemDDialog = (item) => {
    setOpenItemDDialog([true, item]);
  };
  const handleCloseItemDDialog = () => {
    setOpenItemDDialog([false, {}]);
  };

  const employeeDelete = (employee) => {
    console.log(employee)
    async function deleteEmployee(){
      await deleteDoc(doc(db, "Employees", employee.id));
    }
    try {
      deleteEmployee()
      let tempEmp = employees
      const deleteIndex = tempEmp.indexOf((employees.find(emp => emp.id === employee.id)))
      tempEmp.splice(deleteIndex, 1)
      setEmployees(tempEmp)
      console.log("[employee]", employees)
      showSnackbar(["success", "Employee deletion successful"])  
    } catch (error) {
      showSnackbar(["success", "Employee deletion unsuccessful "+error])
    }
  }
  return (
    <>
    <div>
      <Box sx={{width:"100%", display:"flex", justifyContent:"end"}} pb={3}>
        <Button variant="outlined" startIcon={<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>}>
          Add
        </Button>
      </Box>
      <TableContainer sx={{ width: 950 }} component={Paper}>
        <Table sx={{ width: 950 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>email_id</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>phone_no</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Aadhar_no</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}></TableCell>
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
                  <TableCell>
                    <IconButton aria-label="delete" onClick={()=>employeeDelete(row)}><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><rect fill="none" height="24" width="24" /></g><g><path d="M14,8c0-2.21-1.79-4-4-4S6,5.79,6,8s1.79,4,4,4S14,10.21,14,8z M17,10v2h6v-2H17z M2,18v2h16v-2c0-2.66-5.33-4-8-4 S2,15.34,2,18z" /></g></svg></IconButton></TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

      <Snackbar
        autoHideDuration={4000}
        open={openSnackbar}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarText[0]}
          sx={{ width: "100%" }}
        >
          {snackbarText[1]}
        </Alert>
      </Snackbar>
    </>
  );
}

export default AdminEmployees;
