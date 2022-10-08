import { Button, Select, FormControl, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import DatePick from "../components/DatePick";
import Header from "../components/Header";
import Slots from "../components/Slots";
import moment from "moment";
import AboutAppointment from "../components/AboutAppointment";
import { UserContext } from "../services/UserContext";
import {
  collection,
  getDocs,
  doc,
  addDoc,
  query,
  where,
} from "@firebase/firestore";
import { db } from "../firebase";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
function Portal() {
  const context = React.useContext(UserContext);
  const [service, setService] = React.useState(1);
  const [date, setStateDate] = React.useState(null);
  const [pageLoading, setPageLoading] = React.useState(false);
  const [slotsLoading, setSlotsLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarText, setSnackbarText] = React.useState([]);
  const [servicesList, setServicesList] = React.useState([]);
  const [slotsList, setSlotsList] = React.useState([]);
  const [slotsAvailability, setSlotsAvailability] = React.useState([]);
  const [slot, setSlot] = React.useState(0);
  const [slotDataLoad, setSlotDataLoad] = React.useState(false);
  const btnRef = React.useRef();
  const navigate = useNavigate();

  const clickBtn = () => {
    btnRef.current.click();
  };

  const showSnackbar = (msg) => {
    setSnackbarText(msg);
    setOpenSnackbar(true);
  };
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  const handleChange = (event) => {
    setService(event.target.value);
  };
  React.useEffect(() => {
    setSlotDataLoad(true);
    const dateObj = moment(date);
    console.log(dateObj.date());

    if (slotsList.length > 1) {
      console.log("[] slotsList len > 0");
      let arr = [];
      for (let i = 0; i < slotsList.length; i++) {
        async function getAvail() {
          const queryQ = query(
            collection(db, "Appointments"),
            where("slot_id", "==", slotsList[i].id),
            where(
              "date",
              "==",
              "" +
                dateObj.date() +
                "/" +
                (dateObj.month() + 1) +
                "/" +
                dateObj.year()
            )
          );
          const docSnap = await getDocs(queryQ);
          arr[i] = docSnap.docs.length;
        }
        getAvail();
      }
      setSlotsAvailability(arr);
      clickBtn();
      setTimeout(function () {
        setSlotDataLoad(false);
      }, 2000);

      console.log(arr);
    }
  }, [date]);

  React.useEffect(() => {
    console.log("slotsArray changed", slotsAvailability);
  }, [slotsAvailability]);

  const bookAppointment = async () => {
    const dateObj = moment(date);
    const booking_id =
      dateObj.format("MMMM").substring(0, 3).toUpperCase() +
      "_" +
      dateObj.date() +
      "_" +
      (slotsAvailability[slot] + 1);
    console.log("bookappointent", slotsAvailability);
    setLoading(true);
    try {
      await addDoc(collection(db, "Appointments"), {
        booking_id: booking_id,
        date:
          "" +
          dateObj.date() +
          "/" +
          (dateObj.month() + 1) +
          "/" +
          dateObj.year(),
        user_id: context.data.user_id,
        slot_id: slotsList[slot].id,
        service_id: doc(db, "Services", servicesList[service].id),
      });
      console.log("first", slotsAvailability[slot] + 1, slot);
      showSnackbar([
        "success",
        "Your appointment has been booked successfully!",
      ]);
      console.log("[BookAppointment] success");
      navigate(`/confirmation?id=${booking_id}`);
    } catch (err) {
      showSnackbar([
        "error",
        "Something went wrong while booking your appointment.",
      ]);
      console.log("[BookAppointment] error", err);
    }
    setLoading(false);
  };
  const nakliClick = async () => {
    console.log("bookappointent", slotsAvailability);
    setLoading(true);
    try {
      showSnackbar(["success", "Slots updated!"]);
    } catch (err) {
      showSnackbar(["error", "Slots updation failed"]);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    setPageLoading(true);
    async function getServices() {
      const docsSnap = await getDocs(collection(db, "Services"));
      const arr = [];
      docsSnap.forEach((doc) => {
        arr.push({ id: doc.id, ...doc.data() });
        console.log(doc.data());
      });
      setServicesList(arr);
    }
    getServices();

    async function getSlots() {
      console.log("[getSlots] init");
      const docsSnap = await getDocs(collection(db, "Slots"));
      const arr = [];
      docsSnap.forEach(async (doc) => {
        arr.push({ id: doc.id, ...doc.data() });
      });
      setSlotsList(arr);
      console.log("slotsArr", slotsList);
    }
    setPageLoading(false);
    setSlotsLoading(true);
    getSlots();
    setSlotsLoading(false);

    setSlotDataLoad(true);

    const dateObj = moment(date);
    console.log(dateObj.date());

    if (slotsList.length > 1) {
      console.log("[] slotsList len > 0");
      let arr = [];
      for (let i = 0; i < slotsList.length; i++) {
        async function getAvail() {
          const queryQ = query(
            collection(db, "Appointments"),
            where("slot_id", "==", slotsList[i].id),
            where(
              "date",
              "==",
              "" +
                dateObj.date() +
                "/" +
                (dateObj.month() + 1) +
                "/" +
                dateObj.year()
            )
          );
          const docSnap = await getDocs(queryQ);
          arr[i] = docSnap.docs.length;
          console.log("bhak", docSnap.docs);
          // console.log("collection(db, Appointments),where(user_id, ==, "+context.data.user_id+"),where(slot_id, ==, "+slotsList[i].id+"),where(date, ==, " + dateObj.date() + "/" + (dateObj.month() + 1) + "/" + dateObj.year())
        }
        getAvail();
      }
      setSlotsAvailability(arr);
      clickBtn();
      console.log(arr);
      setTimeout(function () {
        setSlotDataLoad(false);
      }, 2000);
    }
  }, []);

  if (!pageLoading) {
    return (
      <Box>
        <Header />
        <Box p={2}>
          <Grid container columnSpacing={{ md: 4 }}>
            <Grid
              item
              xs={12}
              md={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
              }}
            >
              <div>
                <FormControl variant="standard" sx={{ minWidth: 250 }}>
                  <Typography
                    styles={{ paddingLeft: "10px", paddingTop: "10px" }}
                  >
                    <h4>Select the service</h4>
                  </Typography>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={service}
                    onChange={handleChange}
                    native
                    variant="outlined"
                  >
                    <optgroup label="Issuance">
                      {servicesList.map((service, i) => (
                        <option value={i}>{service.name}</option>
                      ))}
                    </optgroup>
                  </Select>
                </FormControl>
                <div className="datePickContainer">
                  <Typography>
                    <h4>Pick a date</h4>
                  </Typography>
                  <DatePick announceDate={(date) => setStateDate(date)} />
                  <Button
                    ref={btnRef}
                    style={{ display: "none" }}
                    onClick={nakliClick}
                  >
                    effefef
                  </Button>
                </div>
                <div>&nbsp;</div>
                <div>&nbsp;</div>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              {date === null ? (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                  }}
                >
                  <Typography sx={{ textAlign: "center", padding: 0 }}>
                    <h4>Select a date to make an appointment</h4>
                  </Typography>
                </div>
              ) : slotsLoading ? (
                <div className="slotsContainer">
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      flexDirection: "column",
                    }}
                  >
                    <Typography sx={{ marginLeft: "15px", padding: 0 }}>
                      <h4>Pick a time for appointment</h4>
                    </Typography>
                    <CircularProgress />
                  </div>
                </div>
              ) : (
                <Slots
                  validSlots={slotsList}
                  loading={slotDataLoad}
                  availabilityArray={slotsAvailability}
                  announceSlot={(i) => {
                    setSlot(i);
                  }}
                />
              )}
              {servicesList.length > 1 && (
                <AboutAppointment service={servicesList[service]} />
              )}
            </Grid>
            <Grid item xs={12} md={3}>
              {date === null ? (
                <></>
              ) : (
                <div
                  style={{ marginTop: "30px" }}
                  className="genericContainer confirmContainer"
                >
                  <Typography sx={{ marginLeft: "15px", padding: 0 }}>
                    <h4>Appointment Confirmation</h4>
                  </Typography>
                  <div className="confirmBody">
                    <div className="confirmDate">
                      <Typography
                        variant="h2"
                        sx={{ fontWeight: "bold", color: "#fff" }}
                      >
                        {date?.date()}
                      </Typography>
                    </div>
                    <div className="confirmFullDate">
                      {date.format("dddd")}, {date.format("MMMM")} {date.date()}
                    </div>
                    <div className="confirmDateDetail">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24"
                          viewBox="0 0 24 24"
                          width="18"
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path
                            fill="#333"
                            d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
                          />
                          <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                        </svg>
                      </span>
                      <span style={{ marginLeft: "05px" }}>
                        {slotsList[slot].time} -{" "}
                        {slot === slotsList.length - 1
                          ? "06 : 00 PM"
                          : slotsList[slot + 1]?.time}
                      </span>
                    </div>
                    <div className="confirmDateDetail">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          enable-background="new 0 0 24 24"
                          height="24"
                          viewBox="0 0 24 24"
                          width="18"
                        >
                          <g>
                            <path d="M0,0h24v24H0V0z" fill="none" />
                          </g>
                          <g>
                            <path
                              fill="#333"
                              d="M12,2c-4.2,0-8,3.22-8,8.2c0,3.32,2.67,7.25,8,11.8c5.33-4.55,8-8.48,8-11.8C20,5.22,16.2,2,12,2z M12,12c-1.1,0-2-0.9-2-2 c0-1.1,0.9-2,2-2c1.1,0,2,0.9,2,2C14,11.1,13.1,12,12,12z"
                            />
                          </g>
                        </svg>
                      </span>
                      <span style={{ marginLeft: "05px" }}>
                        Mamlatdar & Executive Magistrate Office, Railway Colony,
                        Bharuch, Gujarat 392001
                      </span>
                    </div>
                    <br />
                    <Button
                      variant="contained"
                      onClick={bookAppointment}
                      disabled={loading}
                      style={{ transition: "all 0.5s ease-in-out" }}
                    >
                      {!loading ? (
                        <>Book Appointment</>
                      ) : (
                        <>
                          <span style={{ opacity: 0 }}>----</span>
                          <CircularProgress size="1rem" color="secondary" />
                          <span style={{ opacity: 0 }}>----</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </Grid>
          </Grid>
        </Box>
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
      </Box>
    );
  } else {
    return <CircularProgress />;
  }
}

export default Portal;
