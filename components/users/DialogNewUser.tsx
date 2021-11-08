import * as React from "react";
import {
  TextField,
  Dialog,
  Button,
  InputAdornment,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { DialogActions, DialogContent, DialogTitle, Box } from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Mail, Add, Phone, Person } from "@mui/icons-material";

export default function DialogNewUser() {
  const [departmentName, setDepartmentName] = React.useState("");
  const [departmentID, setDepartmentID] = React.useState("");

  const [firstName, setFirstName] = React.useState("");
  const [firstNameError, setFirstNameError] = React.useState(false);
  const [firstNameHelper, setFirstNameHelper] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [lastNameError, setLastNameError] = React.useState(false);
  const [lastNameHelper, setLastNameHelper] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [phoneNumberError, setPhoneNumberError] = React.useState(false);
  const [phoneNumberHelper, setPhoneNumberHelper] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const err: string = "This is a required field";

  const handleClickOpen = () => {
    setOpen(true);
  };

  function checkFirstName(e: string) {
    setFirstName(e);
    if (e.length != 0) {
      setFirstNameError(false);
      setFirstNameHelper("");
    } else {
      setFirstNameError(true);
      setFirstNameHelper(err);
    }
  }

  function checkLastName(e: string) {
    setLastName(e);
    if (e.length != 0) {
      setLastNameError(false);
      setLastNameHelper("");
    } else {
      setLastNameError(true);
      setLastNameHelper(err);
    }
  }

  function checkEmailAddress(e: string) {
    setEmailAddress(e);
  }

  function checkPhoneNumber(e: string) {
    setPhoneNumber(e.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1"));
    console.log("phone", phoneNumber);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const depo = event.target.value as unknown as Department;
    setDepartmentID(depo.id);
    setDepartmentName(depo.name);
  };

  const createUser = async () => {
    if (!lastNameError && !firstNameError && !phoneNumberError) {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          firstName: firstName,
          lastName: lastName,
          emailAddress: emailAddress,
          phoneNumber: phoneNumber,
          created: serverTimestamp(),
        });
        console.log("Document written with ID: ", docRef.id);
        setOpen(false);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} startIcon={<Add />}>
        New
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create User</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                error={firstNameError}
                id="outlined-error-helper-text"
                label="first name"
                placeholder="Alice"
                defaultValue=""
                onChange={(e) => checkFirstName(e.target.value)}
                helperText={firstNameHelper}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                error={lastNameError}
                id="outlined-error-helper-text"
                label="last name"
                placeholder="Malice"
                defaultValue=""
                onChange={(e) => checkLastName(e.target.value)}
                helperText={lastNameHelper}
                type="text"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div>
              <TextField
                id="outlined-error-helper-text"
                label="email address"
                placeholder="user@email.com"
                onChange={(e) => checkEmailAddress(e.target.value)}
                type="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                error={phoneNumberError}
                id="outlined-error-helper-text"
                label="mobile number"
                placeholder="0712345678"
                defaultValue=""
                type="tel"
                onChange={(e) => checkPhoneNumber(e.target.value)}
                helperText={phoneNumberHelper}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">department</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="department"
                onChange={handleChange}
                renderValue={(value) => <span>{departmentName}</span>}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createUser}>Add User</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
