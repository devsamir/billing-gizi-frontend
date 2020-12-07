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
const MenuModal = ({ handleClose, handleSubmit, status, data }) => {
  const classes = useStyles();
  const [namaMakanan, setNamaMakanan] = useState(() => {
    if (status === "update") return data.namaMakanan;
    return "";
  });
  const [harga, setHarga] = useState(() => {
    if (status === "update") return data.harga;
    return "";
  });
  const handleForm = () => {
    handleSubmit(namaMakanan, harga);
  };
  return (
    <Dialog open onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{status === "create" ? "Tambah" : "Update"} Data Menu</DialogTitle>
      <DialogContent>
        <TextField
          variant="outlined"
          autoFocus
          label="Nama Makanan"
          type="text"
          className={classes.formControl}
          value={namaMakanan}
          onChange={(e) => setNamaMakanan(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="Tarif Makanan"
          type="number"
          className={classes.formControl}
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
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
          {status === "create" ? "Tambah Data Menu" : "Update Data Menu"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MenuModal;
