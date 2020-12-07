import React, { useEffect, useState, useContext, useCallback } from "react";
import { motion } from "framer-motion";
import { Link, Redirect, useParams } from "react-router-dom";
import { Button, Typography, TextField, Fab, FormControl, InputLabel, Select } from "@material-ui/core";
import { FaArrowLeft, FaPlus, FaSave } from "react-icons/fa";
import { Autocomplete } from "@material-ui/lab";
// OWNS
import useStyles from "../styles/mainStyle";
import Template from "../components/Template";
import axios from "../utils/myAxios";
import { RiwayatContext } from "../context/riwayatContext";
import { KamarContext } from "../context/kamarContext";
import { MenuContext } from "../context/menuContext";
import PesananModal from "../components/Modals/PesananModal";
import PesananItem from "../components/PesananItem";
import Loader from "../components/Loader";
import Alert from "../components/Alert";

const PesananUpdate = () => {
  const { id } = useParams();
  //   GLOBAL
  const {
    kamarState: { data: kamarData },
  } = useContext(KamarContext);
  const {
    menuState: { data: menuData },
  } = useContext(MenuContext);
  const {
    updateRiwayat,
    clearRiwayatError,
    clearRiwayatMessage,
    getOneRiwayat,
    riwayatState: { loading, error, message, detail },
  } = useContext(RiwayatContext);
  const classes = useStyles();
  // INPUT
  const [noRawat, setNoRawat] = useState("");
  const [namaPasien, setNamaPasien] = useState("");
  const [namaPemesan, setNamaPemesan] = useState("");
  const [namaKamar, setNamaKamar] = useState("");
  const [nomorKamar, setNomorKamar] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [tanggalTerlayani, setTanggalTerlayani] = useState("");
  const [tanggalBayar, setTanggalBayar] = useState("");
  const [pesanan, setPesanan] = useState([]);
  const [totalTarif, setTotalTarif] = useState(0);
  const [status, setStatus] = useState("belum");
  //   OPTIONS
  const [noRawatOptions, setNoRawatOptions] = useState([]); // Function
  const [kamarOptions, setKamarOptions] = useState([]);
  const [nomorOptions, setNomorOptions] = useState([]);
  //   UI
  const [dialog, setDialog] = useState(false);
  //   FUNCTION INPUT
  const handleNoRawat = (e) => {
    if (e.type === "change") {
      setNoRawat(e.target.value);
      const findPasien = noRawatOptions.find((item) => item.noRawat === e.target.value);
      if (findPasien) {
        setNamaPasien(findPasien.namaPasien);
        setNamaKamar(findPasien.namaKamar);
        setNomorKamar(findPasien.noKamar);
      } else {
        setNamaPasien("");
        setNamaKamar("");
        setNomorKamar("");
      }
    }
    if (e.type === "click") {
      setNoRawat(e.target.textContent);
      const findPasien = noRawatOptions.find((item) => item.noRawat === e.target.textContent);
      if (findPasien) {
        setNamaPasien(findPasien.namaPasien);
        setNamaKamar(findPasien.namaKamar);
        setNomorKamar(findPasien.noKamar);
      } else {
        setNamaPasien("");
        setNamaKamar("");
        setNomorKamar("");
      }
    }
  };
  const handlePesanan = (menu) => {
    if (!pesanan.find((item) => item.id === menu.id)) setPesanan([...pesanan, { ...menu, qty: 1 }]);
  };
  const handleQtyPesanan = (val, id) => {
    const updatePesanan = pesanan.map((item) => {
      if (item.id === id) {
        item.qty = val;
      }
      return item;
    });
    setPesanan(updatePesanan);
  };
  const handleTarif = useCallback(() => {
    const totalTarif = pesanan.reduce((acc, curr) => {
      acc += curr.qty * curr.harga;
      return acc;
    }, 0);
    setTotalTarif(totalTarif);
  }, [pesanan]);
  const deleteTarif = (id) => {
    setPesanan(pesanan.filter((item) => item.id !== id));
  };
  const handleSubmit = async () => {
    const body = {
      noRawat,
      namaPasien,
      namaPemesan,
      namaKamar,
      noKamar: nomorKamar,
      tanggal,
      pesanan,
      totalTarif,
      status,
      tanggalTerlayani,
      tanggalBayar,
    };
    await updateRiwayat(id, body);
  };
  //   FUNCTION UI
  const handleCloseDialog = () => {
    setDialog(false);
  };
  // USE EFFECT
  useEffect(() => {
    if (kamarData) {
      let kamarTemp = [];
      kamarData.forEach((item) => {
        if (!kamarTemp.includes(item.nm_kamar)) {
          kamarTemp.push(item.nm_kamar);
        }
      });
      setKamarOptions(kamarTemp);
    }
  }, [kamarData]);
  useEffect(() => {
    if (kamarData) {
      const findNomor = kamarData
        .filter((item) => {
          return item.nm_kamar === namaKamar;
        })
        .map((item) => item.no_kamar);
      setNomorOptions(findNomor);
    }
  }, [namaKamar, kamarData]);
  // Check Total Pesanan
  useEffect(() => {
    handleTarif();
  }, [pesanan, handleTarif]);
  // Get No Rawat Options
  useEffect(() => {
    axios.get("/api/billing/norawat").then((res) => setNoRawatOptions(res.data));
    clearRiwayatMessage();
  }, [clearRiwayatMessage]);
  useEffect(() => {
    getOneRiwayat(id);
  }, [id, getOneRiwayat]);
  useEffect(() => {
    if (detail) {
      setNoRawat(detail.noRawat);
      setNamaPasien(detail.namaPasien);
      setNamaKamar(detail.namaKamar);
      setNomorKamar(detail.noKamar);
      setTanggal(detail.tanggal);
      setPesanan(detail.pesanan);
      setNamaPemesan(detail.namaPemesan);
      setTanggalTerlayani(detail.tanggalTerlayani);
      setTanggalBayar(detail.tanggalBayar);
      setStatus(detail.status);
    }
  }, [detail]);
  return (
    <>
      {dialog && <PesananModal handleClose={handleCloseDialog} handlePesanan={handlePesanan} menu={menuData || []} />}
      <Alert open={error && true} onClose={clearRiwayatError} severity="error" text={error} />
      {message && <Redirect to="/admin/riwayat" />}
      {loading && <Loader />}
      <Template active="riwayat">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Button variant="text" color="secondary" startIcon={<FaArrowLeft />} component={Link} to="/admin/riwayat">
            Kembali
          </Button>
          <Typography variant="h5" className={classes.title}>
            Edit Billing
          </Typography>

          <div className={classes.formGroup}>
            <Autocomplete
              freeSolo
              options={noRawatOptions.map((item) => item.noRawat) || []}
              value={noRawat}
              onChange={handleNoRawat}
              renderInput={(props) => (
                <TextField {...props} label="Nomor Rawat" variant="outlined" onChange={handleNoRawat} />
              )}
            ></Autocomplete>
          </div>
          <div className={classes.formGroup}>
            <TextField
              label="Nama Pasien"
              variant="outlined"
              value={namaPasien}
              onChange={(e) => setNamaPasien(e.target.value)}
              className={classes.formControl}
            />
          </div>
          <div className={classes.formGroup}>
            <Autocomplete
              value={namaKamar}
              onChange={(e, val) => setNamaKamar(val)}
              options={kamarOptions || []}
              renderInput={(params) => <TextField {...params} label="Nama Kamar" variant="outlined" />}
            />
          </div>
          <div className={classes.formGroup}>
            <Autocomplete
              value={nomorKamar}
              onChange={(e, val) => setNomorKamar(val)}
              options={nomorOptions || []}
              renderInput={(params) => <TextField {...params} label="Nomor Kamar" variant="outlined" />}
            />
          </div>
          <div className={classes.formGroup}>
            <TextField
              label="Nama Pemesan"
              variant="outlined"
              value={namaPemesan}
              onChange={(e) => setNamaPemesan(e.target.value)}
              className={classes.formControl}
            />
          </div>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="inputStatus">Status</InputLabel>
            <Select
              native
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              inputProps={{
                name: "status",
                id: "inputStatus",
              }}
            >
              <option aria-label="None" value="" />
              <option value="belum">Belum</option>
              <option value="terlayani">Terlayani</option>
              <option value="sudah">Sudah</option>
            </Select>
          </FormControl>
          <div className={classes.formGroup}>
            <TextField
              type="datetime-local"
              variant="outlined"
              label="Tanggal Pesan"
              InputLabelProps={{
                shrink: true,
              }}
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className={classes.formControl}
            />
          </div>
          <div className={classes.formGroup}>
            <TextField
              type="datetime-local"
              variant="outlined"
              label="Tanggal Terlayani"
              InputLabelProps={{
                shrink: true,
              }}
              value={tanggalTerlayani}
              onChange={(e) => setTanggalTerlayani(e.target.value)}
              className={classes.formControl}
            />
          </div>
          <div className={classes.formGroup}>
            <TextField
              type="datetime-local"
              variant="outlined"
              label="Tanggal Bayar"
              InputLabelProps={{
                shrink: true,
              }}
              value={tanggalBayar}
              onChange={(e) => setTanggalBayar(e.target.value)}
              className={classes.formControl}
            />
          </div>
          <Typography variant="h6" className={classes.title6}>
            Menu
          </Typography>
          <div className={classes.formGroup}>
            <Fab className={classes.fabInfo} size="medium" onClick={() => setDialog(true)}>
              <FaPlus />
            </Fab>
          </div>
          <div className={classes.formGroup}>
            <PesananItem
              pesanan={pesanan}
              handleQtyPesanan={handleQtyPesanan}
              totalTarif={totalTarif}
              deleteTarif={deleteTarif}
            />
          </div>
          {pesanan.length >= 1 && (
            <Button variant="contained" className={classes.buttonWarning} endIcon={<FaSave />} onClick={handleSubmit}>
              Edit Data
            </Button>
          )}
        </motion.div>
      </Template>
    </>
  );
};

export default PesananUpdate;
