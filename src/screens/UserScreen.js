import React, { useState, useContext, useEffect } from "react";
import { Typography, Grow, Fab, TextField } from "@material-ui/core";
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
// OWN
import Template from "../components/Template";
import useStyles from "../styles/mainStyle";
import { UserContext } from "../context/userContext";
import Table from "../components/ClientTable";
import Alert from "../components/Alert";
import UserModal from "../components/Modals/UserModal";
import ConfirmDialog from "../components/ConfirmDialog";
import { motion } from "framer-motion";

const columns = [
  { field: "id", hide: true },
  { field: "username", headerName: "Username", width: 300 },
  { field: "name", headerName: "Nama User", width: 250 },
  { field: "role", headerName: "Hak Akses User", width: 200 },
];

const UserScreen = () => {
  // GLOBAL
  const {
    createUser,
    updateUser,
    deleteUser,
    clearUserError,
    clearUserMessage,
    userState: { loading, data, message, error },
  } = useContext(UserContext);
  // LOCAL
  const classes = useStyles();
  //   State
  const [user, setUser] = useState();
  const [rows, setRows] = useState([]);
  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState("create");
  const [update, setUpdate] = useState({});
  const [confirm, setConfirm] = useState(false);
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
    const { username, role, name } = rows[0];
    const oneUser = { username, role, name };
    setUpdate(oneUser);
    setModal(true);
  };
  const handleSubmit = async (username, password, name, role) => {
    const body = { username, password, name, role };
    if (status === "create") await createUser(body);
    if (status === "update") await updateUser(rows[0].id, body);
    setModal(false);
  };
  const handleDelete = async () => {
    deleteUser(rows[0].id);
    setConfirm(false);
  };
  useEffect(() => {
    setUser(data);
  }, [data]);
  return (
    <>
      <Alert open={message && true} onClose={clearUserMessage} severity="success" text={message} />
      <Alert open={error && true} onClose={clearUserError} severity="error" text={error} />
      {confirm && <ConfirmDialog handleClose={handleConfirmClose} handleConfirm={handleDelete} />}
      {modal && <UserModal handleClose={handleModalClose} handleSubmit={handleSubmit} status={status} data={update} />}
      <Template active="user">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Typography variant="h5" className={classes.title}>
            Setting User
          </Typography>
          <div className={classes.toolContainer}>
            <div className={classes.buttonsContainer}>
              {rows.length === 0 && (
                <Grow in={rows.length === 0 ? true : false}>
                  <Fab className={classes.fabAdd} size="medium" onClick={handleCreate}>
                    <FaPlus />
                  </Fab>
                </Grow>
              )}
              {rows.length === 1 && (
                <Grow in={rows.length === 1 ? true : false}>
                  <Fab className={classes.fabEdit} size="medium" onClick={handleUpdate}>
                    <FaPencilAlt />
                  </Fab>
                </Grow>
              )}
              {rows.length === 1 && (
                <Grow in={rows.length === 1 ? true : false}>
                  <Fab className={classes.fabDelete} size="medium" onClick={() => setConfirm(true)}>
                    <FaTrash />
                  </Fab>
                </Grow>
              )}
            </div>
            <div>
              <TextField type="text" label="Search" variant="outlined" />
            </div>
          </div>
          <Table columns={columns} data={user} loading={loading} handleSelection={handleSelection} />
        </motion.div>
      </Template>
    </>
  );
};

export default UserScreen;
