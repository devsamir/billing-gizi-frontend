import React, { useContext, useState, useEffect } from "react";
import { Typography, Grow, Fab, TextField } from "@material-ui/core";
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
// OWN
import Template from "../components/Template";
import useStyles from "../styles/mainStyle";
import { KamarContext } from "../context/kamarContext";
import { AuthContext } from "../context/authContext";
import Table from "../components/ClientTable";
import Alert from "../components/Alert";
import KamarModal from "../components/Modals/KamarModal";
import ConfirmDialog from "../components/ConfirmDialog";

const columns = [
  { field: "id", hide: true },
  { field: "nm_kamar", headerName: "Nama Kamar", width: 250 },
  { field: "no_kamar", headerName: "Nomor Kamar", width: 200 },
];
const KamarScreen = () => {
  // GLOBAL
  const {
    authState: { isLogin },
  } = useContext(AuthContext);
  const {
    getAllKamar,
    createKamar,
    updateKamar,
    deleteKamar,
    clearKamarError,
    clearKamarMessage,
    kamarState: { loading, data, message, error },
  } = useContext(KamarContext);
  // LOCAL
  const classes = useStyles();
  //   State
  const [kamar, setKamar] = useState();
  const [rows, setRows] = useState([]);
  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState("create");
  const [update, setUpdate] = useState({});
  const [confirm, setConfirm] = useState(false);
  const [search, setSearch] = useState("");
  //  Function
  const handleSelection = (table) => {
    setRows(table.rows || []);
  };
  const handleModalClose = () => {
    setModal(false);
  };
  const handleConfirmClose = () => {
    setConfirm(false);
  };
  const handleCreate = () => {
    setStatus("create");
    setModal(true);
  };
  const handleUpdate = () => {
    setStatus("update");
    const { nm_kamar, no_kamar } = rows[0];
    const oneKamar = { nm_kamar, no_kamar };
    setUpdate(oneKamar);
    setModal(true);
  };
  const handleSubmit = async (nm_kamar, no_kamar) => {
    const body = { nm_kamar, no_kamar };
    if (status === "create") await createKamar(body);
    if (status === "update") await updateKamar(rows[0].id, body);
    setModal(false);
  };
  const handleDelete = async () => {
    const id = rows.map((item) => item.id);
    deleteKamar(id);
    setConfirm(false);
  };

  useEffect(() => {
    if (isLogin) getAllKamar();
  }, [getAllKamar, isLogin]);
  useEffect(() => {
    let localData;
    if (search && data) {
      const colSearch = ["nm_kamar", "no_kamar"];
      localData = data.filter((item) => {
        return colSearch.reduce((acc, curr) => {
          if (`${item[curr]}`.toLowerCase().includes(search)) acc = true;
          return acc;
        }, false);
      });
    } else {
      localData = data;
    }
    setKamar(localData);
  }, [data, search]);
  return (
    <>
      <Alert open={message && true} onClose={clearKamarMessage} severity="success" text={message} />
      <Alert open={error && true} onClose={clearKamarError} severity="error" text={error} />
      {confirm && <ConfirmDialog handleClose={handleConfirmClose} handleConfirm={handleDelete} />}
      {modal && <KamarModal handleClose={handleModalClose} handleSubmit={handleSubmit} status={status} data={update} />}
      <Template active="kamar">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Typography variant="h5" className={classes.title}>
            Setting Kamar
          </Typography>
          <div className={classes.toolContainer}>
            <div className={classes.buttonsContainer}>
              {rows.length === 0 && (
                <Grow in>
                  <Fab className={classes.fabAdd} size="medium" onClick={handleCreate}>
                    <FaPlus />
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
                  <Fab className={classes.fabDelete} size="medium" onClick={() => setConfirm(true)}>
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
          <Table columns={columns} data={kamar} loading={loading} handleSelection={handleSelection} />
        </motion.div>
      </Template>
    </>
  );
};

export default KamarScreen;
