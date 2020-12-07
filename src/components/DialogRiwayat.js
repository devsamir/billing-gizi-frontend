import React from "react";
import { TextField, Button, Dialog, DialogTitle, DialogContent, Grid } from "@material-ui/core";

// OWN
import useStyles from "../styles/mainStyle";
const currency = new Intl.NumberFormat("id", {
  style: "currency",
  currency: "IDR",
});

const BillingScreen = ({ detail, modalView, handleCloseModalView }) => {
  const classes = useStyles();

  return (
    <>
      {detail && (
        <Dialog
          fullWidth
          maxWidth="md"
          open={modalView}
          onClose={handleCloseModalView}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">Detail Billing</DialogTitle>
          <DialogContent>
            <div className={classes.formGroup}>
              <TextField label="Kode Billing" variant="outlined" value={detail.id} className={classes.formControl} />
            </div>
            <div className={classes.formGroup}>
              <TextField
                label="Nomor Rawat"
                variant="outlined"
                value={detail.noRawat}
                className={classes.formControl}
              />
            </div>
            <div className={classes.formGroup}>
              <TextField
                label="Nama Pasien"
                variant="outlined"
                value={detail.namaPasien}
                className={classes.formControl}
              />
            </div>
            <div className={classes.formGroup}>
              <TextField
                label="Nama Pemesan"
                variant="outlined"
                value={detail.namaPemesan}
                className={classes.formControl}
              />
            </div>
            <div className={classes.formGroup}>
              <TextField
                label="Nama Kamar"
                variant="outlined"
                value={detail.namaKamar}
                className={classes.formControl}
              />
            </div>
            <div className={classes.formGroup}>
              <TextField
                label="Nomor Kamar"
                variant="outlined"
                value={detail.noKamar}
                className={classes.formControl}
              />
            </div>
            <div className={classes.formGroup}>
              <TextField
                label="Tanggal Pesan"
                variant="outlined"
                value={detail.tanggal.split("T").join(" ")}
                className={classes.formControl}
              />
            </div>
            <div className={classes.formGroup}>
              <TextField
                label="Tanggal Terlayani"
                variant="outlined"
                value={detail.tanggalTerlayani.split("T").join(" ")}
                className={classes.formControl}
              />
            </div>
            <div className={classes.formGroup}>
              <TextField
                label="Tanggal Bayar"
                variant="outlined"
                value={detail.tanggalBayar.split("T").join(" ")}
                className={classes.formControl}
              />
            </div>
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
            {detail.pesanan.map((item) => {
              return (
                <Grid className={classes.listContainer} container key={item.id}>
                  <Grid item xs={3}>
                    {item.namaMakanan}
                  </Grid>
                  <Grid item xs={3}>
                    {currency.format(item.harga)}
                  </Grid>
                  <Grid item xs={2}>
                    {item.qty}
                  </Grid>
                  <Grid item xs={3}>
                    {currency.format(item.qty * item.harga)}
                  </Grid>
                </Grid>
              );
            })}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "2rem" }}>
              <Button variant="text" color="secondary" onClick={handleCloseModalView}>
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default BillingScreen;
