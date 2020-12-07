import React, { useState } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from "@material-ui/core";

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
const KamarModal = ({ handleClose, handleSubmit, status, data }) => {
  const classes = useStyles();
  const [nm_kamar, set_nm_kamar] = useState(() => {
    if (status === "update") return data.nm_kamar;
    return "";
  });
  const [no_kamar, set_no_kamar] = useState(() => {
    if (status === "update") return data.no_kamar;
    return "";
  });
  const handleForm = () => {
    handleSubmit(nm_kamar, no_kamar);
  };
  return (
    <Dialog open onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{status === "create" ? "Tambah" : "Update"} Data Kamar</DialogTitle>
      <DialogContent>
        <TextField
          variant="outlined"
          autoFocus
          label="Nama Kamar"
          type="text"
          className={classes.formControl}
          value={nm_kamar}
          onChange={(e) => set_nm_kamar(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="Nomor Kamar"
          type="text"
          className={classes.formControl}
          value={no_kamar}
          onChange={(e) => set_no_kamar(e.target.value)}
        />
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
          {status === "create" ? "Tambah Data Kamar" : "Update Data Kamar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default KamarModal;
