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
import { Box } from "@mui/system";
import { Button, IconButton } from "@mui/material";
import {useState} from 'react'
function AdminEmployees() {
  const [employees, setEmployees] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [openItemEDialog, setOpenItemEDialog] = useState([false, {}]);
  const [openItemDDialog, setOpenItemDDialog] = useState([false, {}]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
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
  }, [db]);

  const handleOpenItemDDialog = (item) => {
    setOpenItemDDialog([true, item]);
  };
  const handleCloseItemDDialog = () => {
    setOpenItemDDialog([false, {}]);
  };
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
                    <IconButton aria-label="delete" onClick={handleOpenItemDDialog}><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><rect fill="none" height="24" width="24" /></g><g><path d="M14,8c0-2.21-1.79-4-4-4S6,5.79,6,8s1.79,4,4,4S14,10.21,14,8z M17,10v2h6v-2H17z M2,18v2h16v-2c0-2.66-5.33-4-8-4 S2,15.34,2,18z" /></g></svg></IconButton></TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    
     {/*  <ConfirmationDialog
        feedback={showSnackbar}
        open={openItemDDialog[0]}
        onClose={handleCloseItemDDialog}
        item={__________}
      /> */}
    
    
    </>
  );
}

export default AdminEmployees;

/* export const ConfirmationDialog = ({ open, onClose, item, feedback }) => {
  const context = useContext(SweeatsContext);
  const [loading, setLoading] = useState(false);
  const GetItemReference = async (name) => {
    const docSnap = await getDocs(collection(db, "sweets"));
    const items = docSnap.docs.map((doc) => {
      return { ref: doc.id, name: doc.data().Name };
    });
    return items.filter((i) => i.name === name)[0].ref;
  };
  const deleteItem = async () => {
    setLoading(true);
    try {
      const itemRef = await GetItemReference(item.name);
      await updateDoc(doc(db, "stores", context.data.store_fid), {
        items: arrayRemove({
          price: item.price,
          rating: item.rating,
          available: item.available,
          ref: doc(db, "sweets", itemRef),
        }),
      });
      feedback(["success", "Item deleted successfully."]);
      setTimeout(() => {
        setLoading(false);
        onClose();
      }, 1000);
    } catch (error) {
      console.log("[Items] updateItem ", error);
      feedback(["error", "Item deletion failed."]);
      setTimeout(() => {
        setLoading(false);
        onClose();
      }, 1000);
    }
  };
  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <Grow in={open}>
        <Box>
          <DialogTitle className="font-bold">Delete Item</DialogTitle>
          <DialogContent>
            Delete <b>{item.name}</b> from items menu? This cannot be undone.
          </DialogContent>
          <DialogActions className="flex items-center mt-10 space-x-2">
            <Button onClick={onClose}>Cancel</Button>
            <UILDButton
              type="submit"
              loading={loading}
              text="Yes"
              color="error"
              variant="contained"
              onClick={deleteItem}
            />
          </DialogActions>
        </Box>
      </Grow>
    </Dialog>
  );
};
 */