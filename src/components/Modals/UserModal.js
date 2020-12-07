import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  buttonSuccess: {
    color: "#fff",
    backgroundColor: theme.palette.primary.main,
  },
  buttonEdit: {
    color: "#fff",
    backgroundColor: theme.palette.warning.main,
  },
  formControl: {
    width: "100%",
    margin: "1rem 0",
  },
}));
const UserModal = ({ handleClose, handleSubmit, status, data }) => {
  const classes = useStyles();
  const [username, setUsername] = useState(() => {
    if (status === "update") return data.username;
    return "";
  });
  const [password, setPassword] = useState("");
  const [name, setName] = useState(() => {
    if (status === "update") return data.name;
    return "";
  });
  const [role, setRole] = useState(() => {
    if (status === "update") return data.role;
    return "";
  });
  const handleForm = () => {
    handleSubmit(username, password, name, role);
  };
  return (
    <Dialog open onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{status === "create" ? "Tambah" : "Update"} Data User</DialogTitle>
      <DialogContent>
        <TextField
          variant="outlined"
          autoFocus
          label="Username"
          type="text"
          className={classes.formControl}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="Password"
          type="text"
          className={classes.formControl}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="Name"
          type="text"
          className={classes.formControl}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormControl variant="standard" className={classes.formControl}>
          <InputLabel>Role</InputLabel>
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"admin"}>Admin</MenuItem>
            <MenuItem value={"gizi"}>Gizi</MenuItem>
            <MenuItem value={"keuangan"}>Keuangan</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" variant="text">
          Cancel
        </Button>
        <Button
          onClick={handleForm}
          variant="contained"
          className={status === "create" ? classes.buttonSuccess : classes.buttonEdit}
        >
          {status === "create" ? "Tambah Data User" : "Update Data User"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserModal;
