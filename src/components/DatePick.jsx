import {React, useState } from 'react'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { DatePicker } from "@material-ui/pickers";
import { createTheme, ThemeProvider } from "@material-ui/core";
import '../App.css';
function DatePick() {
  const [date, changeDate] = useState(new Date()); 
  const materialTheme = createTheme({
    typography:{
      fontFamily: ['Open Sans'].join(','),
    },
    palette: {
      primary: {
        main: "#000"
      },
      secondary: {
        main: "#f00"
      }
    },
    overrides: {
      MuiPickersToolbar: {
        toolbar: {
          display: "none"
        },
      },
      MuiPickersCalendarHeader: {
        switchHeader: {
          fontWeight:"bold"
        },
      },
      MuiPickersDay: {
        dayDisabled: {
          color: "#888",
        },
      }
    },
  });
  return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <ThemeProvider theme={materialTheme}>
        <DatePicker
          autoOk
          variant="static"
          openTo="date"
          value={date}
          onChange={changeDate}
          maxDate={(new Date()).setDate(new Date().getDate() + 4)}
          minDate={new Date()}
        /></ThemeProvider>
      </MuiPickersUtilsProvider>
  )
}

export default DatePick