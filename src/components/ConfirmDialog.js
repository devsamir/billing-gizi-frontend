import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  DialogContentText,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  buttonDelete: {
    color: "#fff",
    backgroundColor: theme.palette.error.main,
  },
}));
const ConfirmDialog = ({ handleClose, handleConfirm }) => {
  const classes = useStyles();
  return (
    <Dialog open onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">Yakin Hapus Data ?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Data Yang Hilang Tidak Akan Bisa Dikembalikan
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="text">
          Cancel
        </Button>
        <Button onClick={handleConfirm} variant="contained" className={classes.buttonDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
