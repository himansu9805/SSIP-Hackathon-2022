import { useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Header from '../components/Header'


function History() {

  function createData(name, calories) {
    return { name, calories };
  }

  const rows = [
    createData('Aadhar Card Updation', 159),
    createData('Birth Certificate Issuance', 237),
    createData('Ration Card Updation', 262),
    createData('Voter ID Card Issuance', 305),
    createData('Driver License Updation', 356),
  ];
  return (
    <Box>
      <Header />
      <Box p={5} style={{display:"flex", justifyContent:"center"}}>
        <div style={{ marginTop: "10px", width: "80%", display:"flex", flexDirection:"column", justifyContent:"center"}} className='genericContainer confirmContainer'>
          <Typography sx={{ marginLeft: "15px", padding: 0 }}>
            <h4>Appointment History</h4>
          </Typography>
          <div style={{ display: "flex", justifyContent:"center", alignItems:"center", marginTop:"0px"}}>
            <TableContainer sx={{maxWidth: 650}} component={Paper}>
              <Table sx={{ maxWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{fontWeight:"bold"}}>Service</TableCell>
                    <TableCell sx={{fontWeight:"bold"}} align="right">Date Time</TableCell>
                    <TableCell sx={{fontWeight:"bold"}} align="right">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right" style={{color:"green"}}>Done</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Box>
    </Box>
  )
}

export default History