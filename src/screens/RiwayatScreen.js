import React, { useContext, useState } from "react";
import { Typography, Grow, Fab, TextField, Button } from "@material-ui/core";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";

// OWN
import Table from "../components/ServerTable";
import Template from "../components/Template";
import useStyles from "../styles/mainStyle";
import { RiwayatContext } from "../context/riwayatContext";
import { AuthContext } from "../context/authContext";
import Alert from "../components/Alert";
import DialogRiwayat from "../components/DialogRiwayat";
import ConfirmDialog from "../components/ConfirmDialog";
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
  // { field: "noKamar", headerName: "Nomor", width: 100 },
  {
    field: "tanggal",
    headerName: "Tanggal Pesan",
    width: 200,
    valueFormatter: ({ value }) => value && value.split("T").join(" ").split(".")[0],
  },
  {
    field: "totalTarif",
    headerName: "Total Tarif",
    width: 200,
    valueFormatter: ({ value }) => currency.format(Number(value)),
  },
  { field: "status", headerName: "Status", width: 150 },
  // {
  //   field: "tanggalTerlayani",
  //   headerName: "Tanggal Terlayani",
  //   width: 200,
  //   valueFormatter: ({ value }) => value && value.split("T").join(" ").split(".")[0],
  // },
  // {
  //   field: "tanggalBayar",
  //   headerName: "Tanggal Pembayaran",
  //   width: 200,
  //   valueFormatter: ({ value }) => value && value.split("T").join(" ").split(".")[0],
  // },
];
const RiwayatScreen = () => {
  // GLOBAL
  const {
    getRiwayat,
    getOneRiwayat,
    deleteRiwayat,
    clearRiwayatError,
    clearRiwayatMessage,
    riwayatState: {
      loading,
      riwayat: { data, result },
      detail,
      error,
      message,
    },
  } = useContext(RiwayatContext);
  const {
    authState: { userData },
  } = useContext(AuthContext);
  // LOCAL
  const classes = useStyles();
  const history = useHistory();
  //   State
  const [rows, setRows] = useState([]);
  const [limit, setLimit] = useState(25);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ field: "tanggal", sort: "desc" });
  const [search, setSearch] = useState("");
  const [modalView, setModalView] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  //  Function
  const handlePage = (table) => {
    setPage(table.page);
    getRiwayat(table.page, limit, sort, search);
  };
  const handleLimit = (table) => {
    setLimit(table.pageSize);
    getRiwayat(page, table.pageSize, sort, search);
  };
  const handleSort = (table) => {
    setSort(table.sortModel[0]);
    getRiwayat(page, limit, table.sortModel[0], search);
  };
  const handleSelection = (table) => {
    setRows(table.rows || []);
  };
  const handleSearch = () => {
    getRiwayat(page, limit, sort, search);
  };
  const handleOpenModalView = async () => {
    await getOneRiwayat(rows[0].id);
    setModalView(true);
  };
  const handleCloseModalView = () => {
    setModalView(false);
  };
  const handleUpdate = () => {
    history.push(`/admin/riwayat/${rows[0].id}`);
  };
  const handleCloseModalDelete = () => {
    setModalDelete(false);
  };
  const handleOpenModalDelete = () => {
    setModalDelete(true);
  };
  const handleDelete = async () => {
    const id = rows.map((item) => item.id);
    await deleteRiwayat(id);
    setModalDelete(false);
    await getRiwayat(page, limit, sort, search);
  };

  return (
    <>
      <Alert open={error && true} onClose={clearRiwayatError} severity="error" text={error} />
      <Alert open={message && true} onClose={clearRiwayatMessage} severity="success" text={message} />
      {modalDelete && <ConfirmDialog handleClose={handleCloseModalDelete} handleConfirm={handleDelete} />}
      <Template active="riwayat">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Typography variant="h5" className={classes.title}>
            Riwayat Billing
          </Typography>
          <div className={classes.toolContainer}>
            <div className={classes.buttonsContainer}>
              {rows.length === 1 && (
                <Grow in>
                  <Fab className={classes.fabInfo} size="medium" onClick={handleOpenModalView}>
                    <FaEye />
                  </Fab>
                </Grow>
              )}
              {rows.length === 1 && userData.role === "admin" && (
                <Grow in>
                  <Fab className={classes.fabEdit} size="medium" onClick={handleUpdate}>
                    <FaEdit />
                  </Fab>
                </Grow>
              )}
              {rows.length >= 1 && userData.role === "admin" && (
                <Grow in>
                  <Fab className={classes.fabDelete} size="medium" onClick={handleOpenModalDelete}>
                    <FaTrash />
                  </Fab>
                </Grow>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <TextField
                type="text"
                label="Search"
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button color="primary" variant="contained" style={{ color: "#fff" }} onClick={handleSearch}>
                Cari
              </Button>
            </div>
          </div>
          <Table
            options={{
              columns,
              data,
              result,
              limit,
              loading,
              handlePage,
              handleLimit,
              handleSort,
              page,
              handleSelection,
            }}
          />
        </motion.div>
      </Template>
      <DialogRiwayat detail={detail || false} modalView={modalView} handleCloseModalView={handleCloseModalView} />
    </>
  );
};

export default RiwayatScreen;
