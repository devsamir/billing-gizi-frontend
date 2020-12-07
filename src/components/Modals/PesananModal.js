import React, { useState, useEffect } from "react";
import {
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  makeStyles,
  Divider,
} from "@material-ui/core";
import { FaUtensils } from "react-icons/fa";
// STYLES
const useStyles = makeStyles((theme) => ({
  search: {
    margin: "1rem 0",
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
}));
const currency = new Intl.NumberFormat("id", {
  style: "currency",
  currency: "IDR",
});
const PesananModal = ({ handleClose, menu, handlePesanan }) => {
  // Styles
  const classes = useStyles();
  //
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const handleClick = (item) => {
    handlePesanan(item);
    handleClose();
  };
  useEffect(() => {
    if (search) {
      setOptions(menu.filter((item) => item.namaMakanan.toLowerCase().includes(search)).slice(0, 5));
    } else {
      setOptions(menu.slice(0, 5));
    }
  }, [menu, search]);
  return (
    <Dialog open onClose={handleClose}>
      <DialogTitle id="form-dialog-title">Pilih Menu</DialogTitle>
      <DialogContent>
        <TextField
          className={classes.search}
          label="Cari Menu"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Divider />
        <List>
          {options.map((item) => {
            return (
              <ListItem button key={item.id} onClick={() => handleClick(item)}>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <FaUtensils />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.namaMakanan} secondary={currency.format(Number(item.harga))} />
              </ListItem>
            );
          })}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default PesananModal;
