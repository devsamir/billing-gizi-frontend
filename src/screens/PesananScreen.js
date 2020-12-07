import React, { useContext, useState, useEffect } from "react";
import { Typography, Grow, Fab, TextField } from "@material-ui/core";
import { FaPencilAlt, FaPlus, FaTrash, FaCheck, FaPrint } from "react-icons/fa";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";

// OWN
import url from "../utils/url";
import Template from "../components/Template";
import useStyles from "../styles/mainStyle";
import { AuthContext } from "../context/authContext";
import { PesananContext } from "../context/pesananContext";
import Table from "../components/ClientTable";
import Alert from "../components/Alert";
import ConfirmDialog from "../components/ConfirmDialog";
import ConfirmTerlayani from "../components/ConfirmTerlayani";
const currency = new Intl.NumberFormat("id", {
  style: "currency",
  currency: "IDR",
});
const columns = [
  { field: "id", headerName: "Kode Billing", width: 150 },
  { field: "noRawat", headerName: "Nomor Rawat", width: 150 },
  { field: "namaPasien", headerName: "Nama Pasien", width: 200 },
  { field: "namaPemesan", headerName: "Nama Pemesan", width: 200 },
  { field: "namaKamar", headerName: "Kamar", width: 150 },
  { field: "tanggal", headerName: "Tanggal", width: 200 },
  {
    field: "totalTarif",
    headerName: "Total Tarif",
    width: 200,
    valueFormatter: ({ value }) => currency.format(Number(value)),
  },
  { field: "status", headerName: "Status", width: 150 },
];
const PesananScreen = () => {
  // GLOBAL
  const {
    authState: { isLogin },
  } = useContext(AuthContext);
  const {
    getAllPesanan,
    deletePesanan,
    clearPesananError,
    clearPesananMessage,
    updatePesananTerlayani,
    pesananState: { loading, data, message, error },
  } = useContext(PesananContext);
  // LOCAL
  const classes = useStyles();
  const history = useHistory();
  //   State
  const [menu, setMenu] = useState();
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [terlayani, setTerlayani] = useState(false);
  //  Function
  const handleTerlayani = (tanggalTerlayani) => {
    const idPesanan = rows.map((item) => item.id);
    updatePesananTerlayani(idPesanan, tanggalTerlayani);
    setTerlayani(false);
  };
  const handleSelection = (table) => {
    setRows(table.rows || []);
  };
  const handleUpdate = () => {
    history.push(`/admin/pesanan/update/${rows[0].id}`);
  };
  const handleDelete = () => {
    const idPesanan = rows.map((item) => item.id);
    deletePesanan(idPesanan);
    setConfirm(false);
  };
  const handleOpenConfirm = () => {
    setConfirm(true);
  };
  const handleCloseConfirm = () => {
    setConfirm(false);
  };
  const handleOpenTerlayani = () => {
    setTerlayani(true);
  };
  const handleCloseTerlayani = () => {
    setTerlayani(false);
  };
  const handlePrint = () => {
    const win = window.open(`${url}/report/billing/${rows[0].id}`, "_blank");
    win.focus();
  };
  useEffect(() => {
    let localData;
    if (search) {
      const colSearch = ["id", "nomorRawat", "namaPasien", "namaKamar", "tanggal", "totalTarif", "status"];
      localData = data.filter((item) => {
        return colSearch.reduce((acc, curr) => {
          if (`${item[curr]}`.toLowerCase().includes(search)) acc = true;
          return acc;
        }, false);
      });
    } else {
      localData = data;
    }
    setMenu(localData);
  }, [data, search]);
  useEffect(() => {
    if (isLogin) getAllPesanan();
  }, [getAllPesanan, isLogin]);

  return (
    <>
      <Alert open={message && true} onClose={clearPesananMessage} severity="success" text={message} />
      <Alert open={error && true} onClose={clearPesananError} severity="error" text={error} />
      {confirm && <ConfirmDialog handleClose={handleCloseConfirm} handleConfirm={handleDelete} />}
      {terlayani && <ConfirmTerlayani handleClose={handleCloseTerlayani} handleConfirm={handleTerlayani} />}
      <Template active="pesanan">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Typography variant="h5" className={classes.title}>
            Pesanan
          </Typography>
          <div className={classes.toolContainer}>
            <div className={classes.buttonsContainer}>
              {rows.length === 0 && (
                <Grow in>
                  <Fab className={classes.fabAdd} size="medium" onClick={() => history.push("/admin/pesanan/create")}>
                    <FaPlus />
                  </Fab>
                </Grow>
              )}
              {rows.length === 1 && (
                <Grow in>
                  <Fab className={classes.fabPrint} size="medium" onClick={handlePrint}>
                    <FaPrint />
                  </Fab>
                </Grow>
              )}
              {rows.length >= 1 && (
                <Grow in>
                  <Fab className={classes.fabInfo} size="medium" onClick={handleOpenTerlayani}>
                    <FaCheck />
                  </Fab>
                </Grow>
              )}
              {rows.length === 1 && (
                <Grow in>
                  <Fab className={classes.fabEdit} size="medium" onClick={handleUpdate}>
                    <FaPencilAlt />
                  </Fab>
                </Grow>
              )}
              {rows.length >= 1 && (
                <Grow in>
                  <Fab className={classes.fabDelete} size="medium" onClick={handleOpenConfirm}>
                    <FaTrash />
                  </Fab>
                </Grow>
              )}
            </div>
            <div>
              <TextField
                type="text"
                label="Search"
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <Table columns={columns} data={menu} loading={loading} handleSelection={handleSelection} />
        </motion.div>
      </Template>
    </>
  );
};

export default PesananScreen;
