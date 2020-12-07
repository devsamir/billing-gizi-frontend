import React, { useContext, useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Divider,
  Button,
  Grow,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  ListItem,
  ListItemAvatar,
  Avatar,
  List,
  ListItemText,
} from "@material-ui/core";
import { FaCheck, FaEye } from "react-icons/fa";
import { MdMoneyOff, MdAttachMoney, MdAccountBalanceWallet } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { Autocomplete } from "@material-ui/lab";
import axios from "../utils/myAxios";

// OWN
import Template from "../components/Template";
import useStyles from "../styles/mainStyle";
import { BillingContext } from "../context/billingContext";
import Table from "../components/ClientTable";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import ConfirmSudah from "../components/ConfirmSudah";
const currency = new Intl.NumberFormat("id", {
  style: "currency",
  currency: "IDR",
});
const columns = [
  { field: "id", headerName: "Kode Billing", width: 150 },
  { field: "noRawat", headerName: "Nomor Rawat", width: 150 },
  { field: "namaPasien", headerName: "Nama Pasien", width: 200 },
  { field: "namaKamar", headerName: "Kamar", width: 150 },
  { field: "tanggal", headerName: "Tanggal Pesan", width: 200 },
  { field: "tanggalTerlayani", headerName: "Tanggal Terlayani", width: 200 },
  {
    field: "totalTarif",
    headerName: "Total Tarif",
    width: 200,
    valueFormatter: ({ value }) => currency.format(Number(value)),
  },
  { field: "status", headerName: "Status Pembayaran", width: 170 },
  { field: "tanggalBayar", headerName: "Tanggal Bayar", width: 200 },
];
const BillingScreen = () => {
  // GLOBAL
  const {
    getOneBilling,
    getOneDetailBilling,
    updateBillingSudah,
    clearBillingError,
    clearBillingMessage,
    billingState: { loading, data, detail, message, error },
  } = useContext(BillingContext);
  // LOCAL
  const classes = useStyles();
  //   State
  const [billing, setBilling] = useState([]);
  const [rows, setRows] = useState([]);
  const [noRawat, setNoRawat] = useState("");
  const [modalSudah, setModalSudah] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [rekap, setRekap] = useState(null);
  const [noRawatOptions, setNoRawatOptions] = useState([]);
  //  Function

  const getNoRawatBelum = () => {
    axios.get("/api/billing/norawat-belum").then((res) => {
      setNoRawatOptions(res.data);
    });
  };
  const handleSudah = async (tanggalBayar) => {
    const idBilling = rows.map((item) => item.id);
    await updateBillingSudah(idBilling, tanggalBayar);
    setModalSudah(false);
    getNoRawatBelum();
    getOneBilling(noRawat);
  };
  const handleCloseSudah = () => {
    setModalSudah(false);
  };
  const handleSelection = (table) => {
    setRows(table.rows || []);
  };
  const handleSearch = () => {
    getOneBilling(noRawat);
  };
  const handleDetail = async () => {
    await getOneDetailBilling(rows[0].id);
    setModalView(true);
  };
  const handleCloseModalView = () => {
    setModalView(false);
  };
  const handleNoRawat = (e) => {
    if (e.type === "change") {
      setNoRawat(e.target.value);
    }
    if (e.type === "click") {
      setNoRawat(e.target.textContent);
    }
  };
  useEffect(() => {
    if (data) {
      setBilling(data);
      setNoRawat(data[0].noRawat);
      const total = data.reduce((acc, curr) => {
        acc += curr.totalTarif;
        return acc;
      }, 0);
      const dibayar = data.reduce((acc, curr) => {
        if (curr.status === "Sudah") acc += curr.totalTarif;
        return acc;
      }, 0);
      const rekapData = {
        total,
        dibayar,
        sisa: total - dibayar,
      };
      setRekap(rekapData);
    }
  }, [data]);
  useEffect(() => {
    getNoRawatBelum();
  }, []);
  return (
    <>
      <Alert open={message && true} onClose={clearBillingMessage} severity="success" text={message} />
      <Alert open={error && true} onClose={clearBillingError} severity="error" text={error} />
      {loading && <Loader />}
      {modalSudah && <ConfirmSudah handleClose={handleCloseSudah} handleConfirm={handleSudah} />}
      <Template active="billing">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Typography variant="h5" className={classes.title}>
            Billing
          </Typography>
          <div className={classes.billingSearch}>
            <div className={classes.formControl}>
              <Autocomplete
                freeSolo
                options={noRawatOptions || []}
                value={noRawat}
                onChange={handleNoRawat}
                renderInput={(props) => (
                  <TextField {...props} label="Nomor Rawat" variant="outlined" onChange={handleNoRawat} />
                )}
              ></Autocomplete>
            </div>
            <Button color="primary" variant="contained" className={classes.buttonSearch} onClick={handleSearch}>
              Seach
            </Button>
          </div>
          <Divider />
          <div className={classes.buttonsContainer}>
            {rows.length >= 1 && (
              <Grow in>
                <Fab className={classes.fabAdd} size="medium" onClick={() => setModalSudah(true)}>
                  <FaCheck />
                </Fab>
              </Grow>
            )}
            {rows.length === 1 && (
              <Grow in>
                <Fab className={classes.fabInfo} size="medium" onClick={handleDetail}>
                  <FaEye />
                </Fab>
              </Grow>
            )}
          </div>
          <AnimatePresence>
            {data && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className={classes.billingContainer}
              >
                <List className={classes.listSaldo}>
                  <ListItem className={classes.listSaldoItem}>
                    <ListItemAvatar>
                      <Avatar className={classes.avatarDanger}>
                        <MdMoneyOff />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      secondary="Total Tagihan"
                      primary={rekap ? currency.format(Number(rekap.total)) : 0}
                    />
                  </ListItem>
                  <ListItem className={classes.listSaldoItem}>
                    <ListItemAvatar>
                      <Avatar className={classes.avatarPrimary}>
                        <MdAttachMoney />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      secondary="Tagihan Dibayar"
                      primary={rekap ? currency.format(Number(rekap.dibayar)) : 0}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.avatarInfo}>
                        <MdAccountBalanceWallet />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText secondary="Sisa Tagihan" primary={rekap ? currency.format(Number(rekap.sisa)) : 0} />
                  </ListItem>
                </List>
                <Table
                  columns={columns}
                  data={billing}
                  loading={loading}
                  handleSelection={handleSelection}
                  autoHeight
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Template>
      {/* DIALOG */}
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
