import React, { useContext, useState, useEffect } from "react";
import {
  Typography,
  Grid,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  List,
  TextField,
  Divider,
  FormControl,
  InputLabel,
  Select,
  Button,
} from "@material-ui/core";
import { motion } from "framer-motion";
import { MdDoneAll, MdLibraryBooks, MdClose, MdFileDownload, MdAttachMoney } from "react-icons/md";
import { format } from "date-fns";
// OWN
import Template from "../components/Template";
import useStyles from "../styles/mainStyle";
import { GiziContext } from "../context/giziContext";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import LineChart from "../components/ChartGizi/LineChart";
import PieChart from "../components/ChartGizi/PieChart";
import KamarChart from "../components/ChartGizi/KamarChart";
import url from "../utils/url";
// const currency = new Intl.NumberFormat("id", {
//   style: "currency",
//   currency: "IDR",
// });
const DashboardScreen = () => {
  // GLOBAL
  const {
    giziState: { overview, loading, error, message, area, favorit, kamar },
    getOverview,
    getDataCountArea,
    getDataCountFavorit,
    getDataCountKamar,
    clearGiziError,
    clearGiziMessage,
  } = useContext(GiziContext);
  // LOCAL
  const classes = useStyles();
  //   State
  const [tanggalAwal, setTanggalAwal] = useState("");
  const [tanggalAkhir, setTanggalAkhir] = useState("");
  const [satuan, setSatuan] = useState("harian");
  const [fetchData, setFetchData] = useState(true);
  //  Function
  const handleDownloadMaster = async () => {
    window.open(`${url}/report/master/${tanggalAwal}/${tanggalAkhir}`, "_blank");
    // window.open(`${url}/report/detail/${tanggalAwal}/${tanggalAkhir}`, "_blank");
  };
  const handleDownloadDetail = async () => {
    // window.open(`${url}/report/master/${tanggalAwal}/${tanggalAkhir}`, "_blank");
    window.open(`${url}/report/detail/${tanggalAwal}/${tanggalAkhir}`, "_blank");
  };
  useEffect(() => {
    const dateNow = format(new Date().getTime(), "yyyy-MM-dd");
    const dateLastWeek = format(new Date().getTime() - 6 * 24 * 60 * 60 * 1000, "yyyy-MM-dd");
    setTanggalAwal(dateLastWeek);
    setTanggalAkhir(dateNow);
  }, [getOverview]);
  //   GET DATA
  useEffect(() => {
    if (tanggalAwal && tanggalAkhir && satuan && fetchData) {
      getOverview({ tanggalAwal, tanggalAkhir });
      getDataCountArea({ tanggalAwal, tanggalAkhir, satuan });
      getDataCountKamar({ tanggalAwal, tanggalAkhir });
      getDataCountFavorit({ tanggalAwal, tanggalAkhir });
      setFetchData(false);
    }
  }, [
    tanggalAwal,
    tanggalAkhir,
    satuan,
    getOverview,
    getDataCountArea,
    getDataCountFavorit,
    getDataCountKamar,
    fetchData,
  ]);
  return (
    <>
      <Alert open={message && true} onClose={clearGiziMessage} severity="success" text={message} />
      <Alert open={error && true} onClose={clearGiziError} severity="error" text={error} />
      {loading && <Loader />}
      <Template active="dashboard">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Typography variant="h5" className={classes.title}>
            Dashboard
          </Typography>
          <Grid container spacing={3} className={classes.overview}>
            <Grid xs={12} md={3} item>
              <TextField
                variant="outlined"
                label="Tanggal Awal"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={tanggalAwal}
                onChange={(e) => setTanggalAwal(e.target.value)}
                className={classes.formControl}
              />
            </Grid>
            <Grid xs={12} md={3} item>
              <TextField
                className={classes.formControl}
                variant="outlined"
                label="Tanggal Akhir"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={tanggalAkhir}
                onChange={(e) => setTanggalAkhir(e.target.value)}
              />
            </Grid>
            <Grid xs={12} md={3} item>
              <FormControl variant="standard" className={classes.formControl}>
                <InputLabel htmlFor="inputSatuan">Satuan</InputLabel>
                <Select
                  native
                  value={satuan}
                  onChange={(e) => setSatuan(e.target.value)}
                  inputProps={{
                    name: "Satuan",
                    id: "inputSatuan",
                  }}
                >
                  <option value="harian">Harian</option>
                  <option value="bulanan">Bulanan</option>
                  <option value="tahunan">Tahunan</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} md={6} item>
              <Button
                color="primary"
                variant="contained"
                className={classes.buttonPrimary}
                onClick={() => setFetchData(true)}
              >
                Tampil
              </Button>
              <Button
                startIcon={<MdFileDownload />}
                color="secondary"
                variant="text"
                style={{ marginLeft: "1rem" }}
                onClick={handleDownloadMaster}
              >
                Master
              </Button>
              <Button
                startIcon={<MdFileDownload />}
                color="secondary"
                variant="text"
                style={{ margin: "0 1rem" }}
                onClick={handleDownloadDetail}
              >
                Detail
              </Button>
            </Grid>
          </Grid>
          <Divider />
          {/* ANIMATION */}
          {overview && !loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ margin: "2rem 0" }}>
              <List className={classes.listSaldo}>
                <ListItem className={classes.listSaldoItem}>
                  <ListItemAvatar>
                    <Avatar className={classes.avatarInfo}>
                      <MdLibraryBooks />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText secondary="Total Pesanan" primary={overview ? overview.total : 0} />
                </ListItem>
                <ListItem className={classes.listSaldoItem}>
                  <ListItemAvatar>
                    <Avatar className={classes.avatarDanger}>
                      <MdClose />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText secondary="Pesanan Belum Terlayani" primary={overview ? overview.belum : 0} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.avatarPrimary}>
                      <MdDoneAll />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText secondary="Pesanan Sudah Terlayani" primary={overview ? overview.terlayani : 0} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.avatarSuccess}>
                      <MdAttachMoney />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText secondary="Pesanan Sudah Bayar" primary={overview ? overview.sudah : 0} />
                </ListItem>
              </List>
              <Grid container spacing={3}>
                <Grid item xs={12} className={classes.marginAxis}>
                  <LineChart data={area} />
                </Grid>
                <Grid item md={6} xs={12} className={classes.marginAxis}>
                  <PieChart data={favorit} />
                </Grid>
                <Grid item md={6} xs={12} className={classes.marginAxis}>
                  <KamarChart data={kamar} />
                </Grid>
              </Grid>
            </motion.div>
          )}
        </motion.div>
      </Template>
    </>
  );
};

export default DashboardScreen;
