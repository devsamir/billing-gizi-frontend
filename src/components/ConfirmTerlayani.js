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
  buttonInfo: {
    color: "#fff",
    backgroundColor: theme.palette.info.main,
  },
  formControl: {
    width: "100%",
    margin: "2rem 0",
  },
}));
const ConfirmTerlayani = ({ handleClose, handleConfirm }) => {
  const classes = useStyles();
  const [tanggalTerlayani, setTanggalTerlayani] = useState("");
  const handleClick = () => {
    handleConfirm(tanggalTerlayani);
  };
  return (
    <Dialog open onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">Yakin Pesanan Sudah Terlayani?</DialogTitle>
      <DialogContent>
        <TextField
          variant="outlined"
          label="Tanggal Terlayani"
          type="datetime-local"
          className={classes.formControl}
          InputLabelProps={{ shrink: true }}
          value={tanggalTerlayani}
          onChange={(e) => setTanggalTerlayani(e.target.value)}
        />
        <DialogContentText id="alert-dialog-description">
          Data Pesanan Belum Akan Diubah Statusnya Menjadi Terlayani
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="text">
          Cancel
        </Button>
        <Button onClick={handleClick} variant="contained" className={classes.buttonInfo}>
          Update Terlayani
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmTerlayani;
