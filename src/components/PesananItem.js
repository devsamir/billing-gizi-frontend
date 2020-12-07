import React from "react";
import { Grid, makeStyles, Button, TextField } from "@material-ui/core";
import { FaTrash } from "react-icons/fa";

const currency = new Intl.NumberFormat("id", {
  style: "currency",
  currency: "IDR",
});
const useStyles = makeStyles((theme) => ({
  pesanan: {
    margin: "2rem 0",
    color: "rgba(0,0,0,0.7)",
  },
  header: {
    padding: "0 1rem",
  },
  listContainer: {
    width: "100%",
    boxShadow: theme.shadows[1],
    padding: "2rem 1rem",
    margin: "1rem 0",
    borderLeftSize: "5px",
    borderLeftColor: theme.palette.primary.main,
    borderLeftStyle: "solid",
    borderRadius: "5px",
  },
  qtyInput: {
    width: "80px",
    height: "40px",
  },
  totalContainer: {
    fontSize: "1rem",
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

const PesananItem = ({ pesanan, handleQtyPesanan, totalTarif, deleteTarif }) => {
  const handleQty = (val, id) => {
    handleQtyPesanan(val, id);
  };
  const classes = useStyles();
  return (
    <div className={classes.pesanan}>
      {pesanan.length >= 1 && (
        <Grid container className={classes.header}>
          <Grid item xs={3}>
            Makanan
          </Grid>
          <Grid item xs={3}>
            Harga
          </Grid>
          <Grid item xs={2}>
            QTY
          </Grid>
          <Grid item xs={3}>
            Total
          </Grid>
        </Grid>
      )}
      {pesanan.map((item) => {
        return (
          <Grid className={classes.listContainer} container key={item.id}>
            <Grid item xs={3}>
              {item.namaMakanan}
            </Grid>
            <Grid item xs={3}>
              {currency.format(item.harga)}
            </Grid>
            <Grid item xs={2}>
              <TextField
                type="number"
                variant="outlined"
                value={item.qty}
                className={classes.qtyInput}
                onChange={(e) => handleQty(e.target.value, item.id)}
              />
            </Grid>
            <Grid item xs={3}>
              {currency.format(item.qty * item.harga)}
            </Grid>
            <Grid item xs={1}>
              <Button variant="text" color="secondary" onClick={() => deleteTarif(item.id)}>
                <FaTrash />
              </Button>
            </Grid>
          </Grid>
        );
      })}
      {pesanan.length >= 1 && (
        <Grid container className={classes.totalContainer}>
          <Grid item xs={8} className={classes.total}>
            Total
          </Grid>
          <Grid item xs={3}>
            {currency.format(totalTarif)}
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default PesananItem;
