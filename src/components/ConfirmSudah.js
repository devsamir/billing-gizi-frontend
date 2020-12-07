import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  DialogContentText,
  TextField,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  buttonPrimary: {
    color: "#fff",
    backgroundColor: theme.palette.primary.main,
  },
  formControl: {
    width: "100%",
    margin: "2rem 0",
  },
}));
const ConfirmSudah = ({ handleClose, handleConfirm }) => {
  const classes = useStyles();
  const [tanggalSudah, setTanggalSudah] = useState("");
  const handleClick = () => {
    handleConfirm(tanggalSudah);
  };
  return (
    <Dialog open onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">Yakin Billing Sudah Dibayar ?</DialogTitle>
      <DialogContent>
        <TextField
          variant="outlined"
          label="Tanggal Sudah"
          type="datetime-local"
          className={classes.formControl}
          InputLabelProps={{ shrink: true }}
          value={tanggalSudah}
          onChange={(e) => setTanggalSudah(e.target.value)}
        />
        <DialogContentText id="alert-dialog-description">
          Status Billing Akan Diubah Dari Belum Membayar Menjadi Sudah Membayar
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="text">
          Cancel
        </Button>
        <Button onClick={handleClick} variant="contained" className={classes.buttonPrimary}>
          Update Sudah
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmSudah;
